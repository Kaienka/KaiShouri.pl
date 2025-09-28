// import fs from "fs/promises"
// import path from "path"
// import puppeteer from "puppeteer"

// export const POST = async (req) => {
//   try {
//     const url = new URL(req.url)
//     const parts = url.pathname.split("/")
//     const fanficName = parts.pop() || parts.pop()

//     const chaptersDir = path.join(process.cwd(), "fanfictions", fanficName, "chapters")
//     const files = await fs.readdir(chaptersDir)
//     const htmlFiles = files.filter(f => f.endsWith(".html")).sort((a, b) => parseInt(a) - parseInt(b))

//     if (htmlFiles.length === 0) {
//       return new Response("Brak plików HTML", { status: 404 })
//     }

//     const allHtml = await Promise.all(
//       htmlFiles.map(file => fs.readFile(path.join(chaptersDir, file), "utf-8"))
//     )

//     const fullHtml = `
//       <html>
//         <head>
//           <meta charset="utf-8">
//           <title>${fanficName}</title>
//           <style>
//             @import url('https://fonts.googleapis.com/css2?family=Arial&display=swap');
//             body {
//               font-family: Arial, Helvetica, sans-serif !important;
//               font-size: 14px;
//               color: black !important;
//               background: white;
//               line-height: 1.6;
//               margin: 2cm;
//             }
//             h1, h2, h3, h4, h5, h6, p, div {
//               color: black !important;
//               opacity: 1 !important;
//               visibility: visible !important;
//             }
//             .page-break { page-break-after: always; }
//           </style>
//         </head>
//         <body>
//           ${allHtml.join('<div class="page-break"></div>')}
//         </body>
//       </html>
//     `

//     const browser = await puppeteer.launch({
//       headless: 'chrome',
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     })

//     const page = await browser.newPage()
//     await page.setViewport({ width: 1200, height: 1800 })
//     await page.setContent(fullHtml, { waitUntil: "load" })

//     await page.evaluate(() => {
//       document.body.style.zoom = '1'
//       document.body.style.transform = 'scale(1)'
//       document.body.style.opacity = '1'
//     })

//     await page.screenshot({ path: 'debug.png', fullPage: true })

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       preferCSSPageSize: true
//     })
//     await browser.close()

//     const uint8Array = new Uint8Array(pdfBuffer)
//     return new Response(uint8Array, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment; filename=${fanficName}.pdf`,
//       },
//     })
//   } catch (error) {
//     console.error(error)
//     return new Response("Error generating PDF", { status: 500 })
//   }
// }


import fs from "fs/promises"
import path from "path"
import puppeteer from "puppeteer"

export const POST = async (req) => {
  try {
    const url = new URL(req.url)
    const parts = url.pathname.split("/")
    const fanficName = parts.pop() || parts.pop()

    const chaptersDir = path.join(process.cwd(), "fanfictions", fanficName, "chapters")
    const files = await fs.readdir(chaptersDir)
    const htmlFiles = files
      .filter(f => f.endsWith(".html"))
      .sort((a, b) => parseInt(a) - parseInt(b))

    if (htmlFiles.length === 0) {
      return new Response("Brak plików HTML", { status: 404 })
    }

    const allHtml = await Promise.all(
      htmlFiles.map(f => fs.readFile(path.join(chaptersDir, f), "utf-8"))
    )

    const fullHtml = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>${fanficName}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; font-size:14px; margin:2cm; line-height:1.6 }
            .page-break { page-break-after: always; }
          </style>
        </head>
        <body>
          ${allHtml.join('<div class="page-break"></div>')}
        </body>
      </html>
    `

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    })
    const page = await browser.newPage()
    await page.setContent(fullHtml, { waitUntil: "load" })

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true
    })

    await browser.close()

    // Zwracamy ArrayBuffer poprawnie w Next.js App Router
    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    )

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${fanficName}.pdf`,
      },
    })

  } catch (error) {
    console.error(error)
    return new Response("Error generating PDF", { status: 500 })
  }
}
