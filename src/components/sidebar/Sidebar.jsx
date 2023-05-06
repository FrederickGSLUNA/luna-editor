import React, { useContext, useState, useEffect } from 'react'
import './style.css'
import logo from '../../assets/luna-icon-light.png'
import vimLogo from '../../assets/vim-logo.svg'
import { VscGear } from 'react-icons/vsc'
import { MdScreenshotMonitor } from 'react-icons/md'
import { GrRotateRight } from 'react-icons/gr'
import { HiOutlineFolderDownload } from 'react-icons/hi'
import { FiShare2 } from 'react-icons/fi'
import { RiShareBoxLine } from 'react-icons/ri'
import { EditorContext } from '../../App'
import { createZip } from '../../utils/createZip'
// Notifications
import { notifyNotShareable, notifyShare } from '../notifications/notifications'

export default function Sidebar ({ isShareable, url, createHTML }) {
  const [editor] = useContext(EditorContext)

  const [previewWindow, setPreviewWindow] = useState(null)

  // Mostrando y ocultando opciones
  function handleShowOptions () {
    const $app = document.querySelector('.App')
    const $button = document.querySelector('#gear')
    if ($app.style.gridTemplateColumns === '50px 250px auto') {
      $app.style.gridTemplateColumns = '50px 0px auto'
      $button.classList.remove('bri')
    } else {
      $app.style.gridTemplateColumns = '50px 250px auto'
      $button.classList.add('bri')
    }
    const $gear = document.querySelector('#gear')
    $gear.classList.toggle = 'brightness'
  }

  function fullPreview () {
    const preview = document.querySelector('#resultado')
    const btnShowFullPreview = document.querySelector('#full-preview')
    if (preview.classList.contains('full')) {
      preview.classList.remove('full')
      btnShowFullPreview.classList.remove('bri')
    } else {
      preview.classList.add('full')
      btnShowFullPreview.classList.add('bri')
    }
  }

  function rechargeIframe () {
    const $iframe = document.querySelector('#resultadoIframe')
    // eslint-disable-next-line no-self-assign
    $iframe.srcdoc = $iframe.srcdoc
  }

  function share () {
    if (isShareable) {
      navigator.clipboard.writeText(url)
        .then(() => notifyShare())
    } else {
      notifyNotShareable()
    }
  }

  useEffect(() => {
    if (previewWindow) {
      const previewHtml = createHTML(editor.html, editor.css, editor.js)
      const blob = new Blob([previewHtml], { type: 'text/html' })
      previewWindow.location.href = URL.createObjectURL(blob)
    }
  }, [editor, previewWindow])

  function handlePreviewButtonClick () {
    if (previewWindow) {
      previewWindow.close()
    }

    const previewHtml = createHTML(editor.html, editor.css, editor.js)
    const blob = new Blob([previewHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const newPreviewWindow = window.open(url)
    setPreviewWindow(newPreviewWindow)
  }

  return (
    <aside className='sidebar'>
      <nav>
        <ul>
          <li>
            <button className='logo-luna'>
              <img src={logo} width='38' height='38' />
            </button>
          </li>
          <li>
            <button id='btnVim' className='tooltip'>
              <img className='icon' src={vimLogo} width='30' height='30' />
              <span className='tooltiptext'>Modo Vim</span>
            </button>
          </li>
          <li>
            <button id='full-preview' className='tooltip' onClick={fullPreview}>
              <MdScreenshotMonitor className='icon' />
              <span className='tooltiptext'>FullScreen</span>
            </button>
          </li>
          <li>
            <button id='new-tab-preview' className='tooltip' onClick={handlePreviewButtonClick}>
              <RiShareBoxLine className='icon' />
              <span className='tooltiptext'>Preview</span>
            </button>
          </li>
          <li>
            <button className='tooltip' onClick={rechargeIframe}>
              <GrRotateRight className='icon' />
              <span className='tooltiptext'>Recargar</span>
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <button className={`tooltip ${isShareable ? '' : 'not-shareable'}`} onClick={share}>
              <FiShare2 className='icon not' />
              <span className='tooltiptext'>Compartir</span>
            </button>
          </li>
          <li>
            <button className='tooltip' onClick={() => createZip(editor.html, editor.css, editor.js)}>
              <HiOutlineFolderDownload className='icon not' />
              <span className='tooltiptext'>Descargar</span>
            </button>
          </li>
          <li>
            <button id='gear' className='tooltip' onClick={handleShowOptions}>
              <VscGear className='icon' />
              <span className='tooltiptext'>Opciones</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
