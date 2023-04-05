import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const zip = new JSZip()

export function createZip (html, css, js) {
  const htmlFile = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Luna Editor</title>
      <link type="text/css" rel="stylesheet" href="style.css">
    </head>
    <body>
      ${html}
      <script src="script.js"></script>
    </body>
    </html>
  `

  zip.file('index.html', htmlFile)
  zip.file('style.css', css)
  zip.file('script.js', js)
  zip.generateAsync({ type: 'blob' })
    .then(function (content) {
      saveAs(content, 'luna-editor.zip')
    })
}
