import { createContext, useEffect, useState } from 'react'
import './App.css'
import Layout from './components/layout/Layout'
import Sidebar from './components/sidebar/Sidebar'
import SidebarOptions from './components/sidebar/SidebarOptions'
// Preview
import Preview from './components/preview/Preview'
// Editores
import { EditorHTML, EditorCSS, EditorJS } from './components/editors/Editors'
//  Base 64
import { encode, decode } from 'js-base64'
// Notifications
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Console from './components/console/Console'

export const ConfigContext = createContext()
export const EditorContext = createContext()

function App () {
  const [config, setConfig] = useState({
    layout: 'default',
    clearConsole: true,
    grid: '', // Pendiente
    // Opciones del Editor
    options: {
      fontSize: 18,
      fontLigatures: 'on',
      lineNumbers: 'off',
      tabSize: 2,
      wordWrap: 'on',
      minimap: { enabled: false },
      autoClosingBrackets: 'always',
      autoIndent: 'full',
      filterGraceful: true,
      snippetsPreventQuickSuggestions: true,
      lineNumbersMinChars: 3,
      stickyTabStops: true
    }
  })

  const [editor, setEditor] = useState({
    html: '',
    css: '',
    js: ''
  })

  const [isShareable, setIsShareable] = useState(true)
  const [url, setUrl] = useState('')

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    update()
  }, [editor])

  function init () {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
    const splitter = isFirefox ? '|' : '%7C'
    const { pathname } = window.location
    const [rawHtml, rawCss, rawJs] = pathname.slice(1).split(splitter)
    const html = rawHtml ? decode(rawHtml) : ''
    const css = rawCss ? decode(rawCss) : ''
    const js = rawJs ? decode(rawJs) : ''
    setEditor({ ...editor, html, css, js })
  }

  function update () {
    const hashedCode = `${encode(editor.html)}|${encode(editor.css)}|${encode(editor.js)}`
    window.history.replaceState(null, null, `/${hashedCode}`)

    const html = createHTML(editor.html, editor.css, editor.js)
    const iframe = document.querySelector('#resultadoIframe')
    iframe.setAttribute('srcdoc', html)

    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1

    const maxlength = isFirefox ? 2000 : 3000

    if (window.location.href.length < maxlength) {
      setIsShareable(true)
    } else {
      setIsShareable(false)
    }

    setUrl(window.location.href)

    if (config.clearConsole) {
      console.clear() // Limpiar la consola
    }
  }

  function createHTML (html, css, js) {
    const htmlCode = html
    const cssCode = css
    const jsCode = js

    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <style>
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
        <script type="module">
          ${jsCode}
        </script>
      </body>
      </html>
    `
  }

  return (
    <ConfigContext.Provider value={[config, setConfig]}>
      <EditorContext.Provider value={[editor, setEditor]}>
        <div className='App'>
          <Sidebar isShareable={isShareable} url={url} createHTML={createHTML} />
          <SidebarOptions />
          <Layout
            html={<EditorHTML />}
            css={<EditorCSS />}
            js={<EditorJS />}
            resultado={<Preview />}
          />
          {/* <Console /> */}
        </div>
        <ToastContainer />
      </EditorContext.Provider>
    </ConfigContext.Provider>
  )
}

export default App
