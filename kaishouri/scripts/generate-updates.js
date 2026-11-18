/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')


const ficRoot = path.join(process.cwd(), '..', 'fanfictions')
const dirs = fs.readdirSync(ficRoot)

const updates = {}


const repoRoot = path.resolve(process.cwd(), '../..') // repo-root

function getFirstCommitDate(filePath) {
  try {
    const relativePath = path.relative(repoRoot, filePath)
    console.log('Getting git log for:', relativePath)
    const stdout = execSync(
      `git log --follow --format=%aI -- "${relativePath}"`,
      { encoding: 'utf-8', cwd: repoRoot }
    )
    const lines = stdout.trim().split('\n').filter(Boolean)
    if (lines.length === 0) return null
    // git log zwraca od najnowszego, więc ostatnia linia = pierwszy commit
    return new Date(lines[lines.length - 1])
  } catch (e) {
    console.error('git log error:', e)
    return null
  }
}

const ENTITIES = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  hellip: '…', ndash: '–', mdash: '—', bdquo: '„', rdquo: '”', ldquo: '“',
  aogon: 'ą', cacute: 'ć', eogon: 'ę', lstrok: 'ł', nacute: 'ń',
  oacute: 'ó', sacute: 'ś', zacute: 'ź', zdot: 'ż',
}

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const isHex = entity[1].toLowerCase() === 'x'
      const code = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10)
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match
    }
    return ENTITIES[entity.toLowerCase()] ?? match
  })
}

const BLOCK_TAG_RE = /<\/?(?:p|div|br|hr|li|ul|ol|h[1-6]|tr|td|th|table|blockquote|section|article|header|footer|pre|figure|figcaption)\b[^>]*>/gi
const WORD_RE = /[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu

function countWords(html) {
  const text = decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<head\b[\s\S]*?<\/head\s*>/gi, ' ')
      .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, ' ')
      .replace(BLOCK_TAG_RE, ' ')
      .replace(/<[^>]*>/g, '')
  ).normalize('NFC')
  return text.match(WORD_RE)?.length ?? 0
}

function formatWordCount(n) {
  return Math.round(n / 100) * 100
}




dirs.forEach(dir => {
  const chaptersPath = path.join(ficRoot, dir, 'chapters')
  if (!fs.existsSync(chaptersPath)) return

  const files = fs.readdirSync(chaptersPath)
    .filter(f => f.endsWith('.html'))
    .sort((a, b) => {
      const na = parseInt(a.replace('.html', ''))
      const nb = parseInt(b.replace('.html', ''))
      return na - nb
    })

  if (files.length === 0) return

  const last = files[files.length - 1]
  const fullPath = path.join(chaptersPath, last)
  const chapterNo = files.length

  const totalWords = files.reduce(
    (sum, f) => sum + countWords(fs.readFileSync(path.join(chaptersPath, f), 'utf-8')),
    0
  )
  const wordCount = formatWordCount(totalWords)
  const gitDate = getFirstCommitDate(fullPath)?.toISOString() || null

  let fanficTitle = ''
  let finished = false
  let updatedAt = gitDate
  const infoPath = path.join(ficRoot, dir, 'info.json')
  if (fs.existsSync(infoPath)) {
    try {
      const infoContent = fs.readFileSync(infoPath, 'utf-8')
      const infoJson = JSON.parse(infoContent)
      fanficTitle = infoJson.title || ''
      finished = infoJson.finished

      let changed = false
      if (infoJson.wordCount !== wordCount) {
        infoJson.wordCount = wordCount
        changed = true
      }

      const isNewChapter = infoJson.updatedChapterNo !== chapterNo
      if (isNewChapter && gitDate) {
        infoJson.updatedAt = gitDate
        infoJson.updatedChapterNo = chapterNo
        changed = true
      }
      updatedAt = infoJson.updatedAt || gitDate

      if (changed) {
        fs.writeFileSync(infoPath, JSON.stringify(infoJson, null, 2) + '\n', 'utf-8')
        console.log(`${dir}: ${totalWords} słów (zapisano ${wordCount}), aktualizacja ${infoJson.updatedAt} (rozdział ${infoJson.updatedChapterNo})`)
      }
    } catch {
      fanficTitle = ''
    }
  }

  updates[dir] = {
    fanficName: fanficTitle,
    chapter: last,
    updatedAt: updatedAt,
    finished: finished,
    chapterNo: chapterNo
  }
})

const out = path.join(process.cwd(), '..', 'public', 'fanfictions-updates.json')
fs.writeFileSync(out, JSON.stringify(updates, null, 2), 'utf-8')

console.log('Generated fanfictions-updates.json')