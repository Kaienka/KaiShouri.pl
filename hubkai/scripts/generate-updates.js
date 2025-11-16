/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')


const ficRoot = path.join(process.cwd(), '..', 'fanfictions')
const dirs = fs.readdirSync(ficRoot)

const updates = {}

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
  const stats = fs.statSync(fullPath)

  let fanficTitle = ''
  let finished = false
  const infoPath = path.join(ficRoot, dir, 'info.json')
  if (fs.existsSync(infoPath)) {
    try {
      const infoContent = fs.readFileSync(infoPath, 'utf-8')
      const infoJson = JSON.parse(infoContent)
      fanficTitle = infoJson.title || ''
      finished = infoJson.finished
    } catch {
      fanficTitle = ''
    }
  }

  updates[dir] = {
    fanficName: fanficTitle,
    chapter: last,
    updatedAt: stats.mtime.toISOString(),
    finished: finished,
    chapterNo: last
  }
})

const out = path.join(process.cwd(), '..', 'public', 'fanfictions-updates.json')
fs.writeFileSync(out, JSON.stringify(updates, null, 2), 'utf-8')

console.log('Generated fanfictions-updates.json')
