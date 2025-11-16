import fs from 'fs'
import path from 'path'

const root = process.cwd()
const ficRoot = path.join(root, 'fanfictions')

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

  updates[dir] = {
    chapter: last,
    updatedAt: stats.mtime.toISOString()
  }
})

const out = path.join(root, 'public', 'fanfictions-updates.json')
fs.writeFileSync(out, JSON.stringify(updates, null, 2), 'utf-8')

console.log('Generated fanfictions-updates.json, test')
