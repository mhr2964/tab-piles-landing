// Local preview server for the static landing site.
//
// Usage: npm start  (or: node scripts/preview.mjs [port])
// Default port 8787. Serves src/ at the URL root.

import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = resolve(__dirname, '..', 'src')
const port = Number(process.argv[2]) || 8787

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
}

createServer(async (req, res) => {
  let url = (req.url ?? '/').split('?')[0]
  if (url.endsWith('/')) url += 'index.html'
  // No directory traversal: must resolve under srcDir
  const path = resolve(join(srcDir, url))
  if (!path.startsWith(srcDir)) {
    res.writeHead(403).end('forbidden')
    return
  }
  try {
    const s = await stat(path)
    if (s.isDirectory()) {
      const idx = join(path, 'index.html')
      const body = await readFile(idx)
      res.writeHead(200, { 'Content-Type': TYPES['.html'] }).end(body)
      return
    }
    const body = await readFile(path)
    const type = TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream'
    res.writeHead(200, { 'Content-Type': type }).end(body)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found')
  }
}).listen(port, () => {
  console.log(`▸ tab-piles-landing serving src/ at http://localhost:${port}`)
})
