import React, { useEffect } from 'react'
import './style.css'

export default function Console () {
  useEffect(() => {
    const consoleDiv = document.getElementById('console')
    const input = document.getElementById('input')
    const clearBtn = document.getElementById('clear-btn')

    // Redirige console.log() a la consola personalizada
    console.log = function (message) {
      consoleDiv.innerHTML += `
    <div className="console-message">
      <span>${stringifyConsoleOutput(message)}</span>
    </div>
  `
    }

    // Redirige errores a la consola personalizada
    window.onerror = function (message, url, line, column, error) {
      consoleDiv.innerHTML += `
    <div className="console-error">
      <span>${message}</span>
    </div>
  `
    }

    // Función para convertir los objetos y arrays en una cadena de texto
    function stringifyConsoleOutput (output) {
      if (typeof output === 'object') {
        try {
          return JSON.stringify(output)
        } catch (error) {
          return output.toString()
        }
      }
      return output.toString()
    }

    // Ejecuta el comando cuando se presiona Enter
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        try {
        // eslint-disable-next-line no-eval
          eval(event.target.value)
        } catch (error) {
          consoleDiv.innerHTML += `
        <div className="console-error">
          <span>${error.message}</span>
        </div>
      `
        }
        event.target.value = ''
      }
    })

    // Función para limpiar la consola
    function clearConsole () {
      consoleDiv.innerHTML = ''
    }

    // Agrega el evento click al botón de limpiar la consola
    clearBtn.addEventListener('click', clearConsole)
  }, [])

  return (
    <div className='console-container'>
      <div className='console-header'>
        <p>Consola</p>
        <button id='clear-btn'>Limpiar</button>
      </div>
      <div className='console-output' id='console' />
      <div className='console-input'>
        <span className='console-prefix'>$</span>
        <input type='text' id='input' placeholder='Escribe tu comando aquí...' />
      </div>
    </div>
  )
}
