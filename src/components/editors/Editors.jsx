import React, { useContext } from 'react'
import { ConfigContext, EditorContext } from '../../App'
import './style.css'
// Monaco-Editor
import Editor, { loader } from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// Emmet
import { emmetHTML } from 'emmet-monaco-es'
// Vim
import { initVimMode } from 'monaco-vim'
// Notifications
import { notifyVimActivate, notifyVimDesactivate } from '../notifications/notifications'

// Workers
window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'css') {
      // eslint-disable-next-line new-cap
      return new cssWorker()
    }
    if (label === 'html') {
      // eslint-disable-next-line new-cap
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      // eslint-disable-next-line new-cap
      return new tsWorker()
    }
    // eslint-disable-next-line new-cap
    return new editorWorker()
  }
}

loader.config({ monaco })

loader.init().then(/* */)

function handleEditorDidMount (editor) {
  // Activar o desactivar vim
  let vimMode
  const btnVim = document.querySelector('#btnVim')
  btnVim.addEventListener('click', () => {
    if (vimMode) {
      vimMode.dispose()
      vimMode = null
      notifyVimDesactivate()
      btnVim.classList.remove('bri')
    } else {
      vimMode = initVimMode(editor)
      notifyVimActivate()
      btnVim.classList.add('bri')
    }
  })
}

function hiddenLanguageIcon (editor, tag) {
  editor.onDidFocusEditorWidget(() => {
    const elemento = document.querySelector(`${tag} .language-icon`)
    elemento.style.opacity = '.1'
  })

  editor.onDidBlurEditorWidget(() => {
    const elemento = document.querySelector(`${tag} .language-icon`)
    elemento.style.opacity = '1'
  })
}

export function EditorHTML () {
  const [config] = useContext(ConfigContext)
  const [editor, setEditor] = useContext(EditorContext)

  function handleEditorChange (value) {
    setEditor({ ...editor, html: value })
  }

  return (
    <Editor
      width='100%'
      height='100%'
      defaultLanguage='html'
      defaultValue={editor.html}
      theme='vs-dark'
      loading=''
      options={config.options}
      onChange={handleEditorChange}
      onMount={(e) => {
        handleEditorDidMount(e)
        hiddenLanguageIcon(e, '#html')

        if (!window.emmetMonacoInitialized) {
          // Inicializar Emmet una vez
          emmetHTML(monaco)
          window.emmetMonacoInitialized = true
        }
      }}
    />
  )
}

export function EditorCSS () {
  const [config] = useContext(ConfigContext)
  const [editor, setEditor] = useContext(EditorContext)

  function handleEditorChange (value) {
    setEditor({ ...editor, css: value })
  }

  return (
    <Editor
      width='100%'
      height='100%'
      defaultLanguage='css'
      defaultValue={editor.css}
      theme='vs-dark'
      loading=''
      options={config.options}
      onChange={handleEditorChange}
      onMount={(e) => {
        handleEditorDidMount(e)
        hiddenLanguageIcon(e, '#css')
      }}
    />
  )
}

export function EditorJS () {
  const [config] = useContext(ConfigContext)
  const [editor, setEditor] = useContext(EditorContext)

  function handleEditorChange (value) {
    setEditor({ ...editor, js: value })
  }

  return (
    <Editor
      width='100%'
      height='100%'
      defaultLanguage='javascript'
      defaultValue={editor.js}
      theme='vs-dark'
      loading=''
      options={config.options}
      onChange={handleEditorChange}
      onMount={(e) => {
        handleEditorDidMount(e)
        hiddenLanguageIcon(e, '#js')
      }}
    />
  )
}
