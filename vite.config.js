import { defineConfig } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'connect-static-entry',
    async closeBundle() {
      const html = await readFile('dist/index.html', 'utf8');
      await mkdir('dist/connect', { recursive: true });
      await writeFile('dist/connect/index.html', html
        .replace('<title>StopLoss Comics — Degens. Dreams. Disasters.</title>', '<title>Connect — StopLoss Comics</title>')
        .replace('</head>', '<link rel="canonical" href="https://stoplosscomics.com/connect/" /></head>'));
    },
  }],
  base: "/",
})
