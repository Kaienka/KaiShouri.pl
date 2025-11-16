/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')


const ficRoot = path.join(process.cwd(), '..', 'fanfictions')
const dirs = fs.readdirSync(ficRoot)

const updates = {}


function getLastCommitDate(filePath) {
  try {
    const stdout = execSync(`git log -1 --format=%cI -- "${filePath}"`, { encoding: 'utf-8' })
    return new Date(stdout.trim())
  } catch {
    return null
  }
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
    updatedAt: getLastCommitDate(fullPath)?.toISOString() || null,
    finished: finished,
    chapterNo: files.length
  }
})

const out = path.join(process.cwd(), '..', 'public', 'fanfictions-updates.json')
fs.writeFileSync(out, JSON.stringify(updates, null, 2), 'utf-8')

console.log('Generated fanfictions-updates.json')
