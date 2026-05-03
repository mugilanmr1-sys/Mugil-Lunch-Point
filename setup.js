const fs = require('fs');
const path = require('path');

if (!fs.existsSync('src')) fs.mkdirSync('src');

const htmlContent = fs.readFileSync('index.html', 'utf8');
const scriptMatch = htmlContent.match(/<script type="text\/babel">([\s\S]*?)const root = ReactDOM/);
let reactCode = scriptMatch[1];
reactCode = reactCode.replace(/const\s+\{\s*useState,\s*useMemo\s*\}\s*=\s*React;/, 'import React, { useState, useMemo } from "react";');
reactCode = reactCode.replace(/function App\(\)/, 'export default function App()');

fs.writeFileSync('src/App.jsx', reactCode.trim());

const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
fs.writeFileSync('src/main.jsx', mainJsx);

const newIndexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mugil Lunch Point</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
fs.writeFileSync('index.html', newIndexHtml);

const packageJson = {
  "name": "mugil-lunch-point",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.2.0"
  }
};
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`;
fs.writeFileSync('vite.config.js', viteConfig);

console.log('Scaffolding complete!');
