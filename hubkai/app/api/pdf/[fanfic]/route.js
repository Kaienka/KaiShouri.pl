

import fs from "fs/promises";
import path from "path";
import { renderToStream } from "@react-pdf/renderer";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";


Font.register({
  family: "Arial",
  fonts: [
    { src: path.join(process.cwd(), "public/fonts/arial.ttf"), fontWeight: "normal" },
    { src: path.join(process.cwd(), "public/fonts/arial-bold.ttf"), fontWeight: "bold" },
    { src: path.join(process.cwd(), "public/fonts/arial-italic.ttf"), fontStyle: "italic" },
    { src: path.join(process.cwd(), "public/fonts/arial-bold-italic.ttf"), fontWeight: "bold", fontStyle: "italic" }
  ]
})


export const POST = async (req) => {
  try {
    const bodyText = await req.text();
    const body = bodyText ? JSON.parse(bodyText) : {};
    const { title } = body;
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const fanficName = parts.pop() || parts.pop();

    const chaptersDir = path.join(
      process.cwd(),
      "fanfictions",
      fanficName,
      "chapters"
    );
    const files = await fs.readdir(chaptersDir);
    const htmlFiles = files
      .filter((f) => f.endsWith(".html"))
      .sort((a, b) => parseInt(a) - parseInt(b));

    if (htmlFiles.length === 0) {
      return new Response("Brak plików HTML", { status: 404 });
    }

    const allHtml = await Promise.all(
      htmlFiles.map((f) => fs.readFile(path.join(chaptersDir, f), "utf-8"))
    );

    const styles = StyleSheet.create({
      page: {
        paddingTop: 60,
        paddingBottom: 60,
        paddingHorizontal: 50,
        fontSize: 12,
        lineHeight: 1.6,
        fontFamily: "Arial",
        textAlign: "justify",
      },
      chapter: { marginBottom: 20 },
      h1: { fontSize: 16, textAlign: 'center' },
      h2: { fontSize: 14, marginBottom: 12 },
      author: { fontSize: 14, marginBottom: 20, textAlign: 'center' },
      p: { marginBottom: 10 },
      bold: { fontWeight: 'bold' },
      italic: { fontStyle: 'italic' },
      hr: { borderBottomWidth: 1, borderBottomColor: '#000', marginVertical: 5 },
    });

    const parseInlineElements = (text, keyPrefix) => {
      const elements = [];
      let remaining = text;

      const tagRegex = /<(\/?)(b|em)>/i;

      let index = 0;
      while (remaining.length > 0) {
        const match = remaining.match(tagRegex);
        if (!match) {
          elements.push(<Text key={`${keyPrefix}-${index}`}>{remaining}</Text>);
          break;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [fullMatch, closingSlash, tag] = match;
        const splitIndex = match.index;

        if (splitIndex > 0) {
          elements.push(<Text key={`${keyPrefix}-${index}`}>{remaining.slice(0, splitIndex)}</Text>);
          index++;
        }

        remaining = remaining.slice(splitIndex + fullMatch.length);

        let innerText = '';
        const closeTag = `</${tag}>`;
        const closeIndex = remaining.indexOf(closeTag);
        if (closeIndex >= 0) {
          innerText = remaining.slice(0, closeIndex);
          remaining = remaining.slice(closeIndex + closeTag.length);
        }

        if (tag.toLowerCase() === 'b') {
          elements.push(<Text key={`${keyPrefix}-${index}`} style={styles.bold}>{innerText}</Text>);
        } else if (tag.toLowerCase() === 'em') {
          elements.push(<Text key={`${keyPrefix}-${index}`} style={styles.italic}>{innerText}</Text>);
        }
        index++;
      }

      return elements;
    }

    const MyDocument = () => (
      <Document>
        {allHtml.map((chapterHtml, idx) => (
          <Page key={idx} size="A4" style={styles.page}>
            {idx === 0 && (
              <>
                <Text style={styles.h1}>{title}</Text>
                <Text style={styles.author}>Kai Shouri</Text>
              </>
            )}

            <View style={styles.chapter}>
              {(
                chapterHtml.match(/<h2[\s\S]*?<\/h2>|<p[\s\S]*?<\/p>|<hr\s*\/?>/gi) || []
              ).map((block, i) => {
                if (/^<h2/i.test(block.trim())) {
                  const clean = block.replace(/<[^>]+>/g, "").trim();
                  return clean ? (
                    <Text key={i} style={styles.h2}>
                      {clean}
                    </Text>
                  ) : null;
                } else if (/^<hr/i.test(block.trim())) {
                  return <View key={i} style={styles.hr} />;
                } else {
                  const content = block
                    .replace(/<\/?p>/gi, "")
                    .replace(/\s*\n\s*/g, " ")
                    .trim();
                  return content ? (
                    <Text key={i} style={styles.p}>
                      {parseInlineElements(content, i)}
                    </Text>
                  ) : null;
                }
              })}
            </View>
          </Page>
        ))}
      </Document>
    );

    const stream = await renderToStream(<MyDocument />);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${fanficName}.pdf`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Error generating PDF", { status: 500 });
  }
};
