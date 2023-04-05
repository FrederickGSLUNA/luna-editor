import React, { useContext, useEffect } from 'react'
import './style.css'
import { ConfigContext } from '../../App'

export default function SidebarOptions () {
  const [config, setConfig] = useContext(ConfigContext)

  useEffect(() => {
    const storedState = JSON.parse(window.localStorage.getItem('config'))
    if (storedState) {
      setConfig(storedState)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('config', JSON.stringify(config))
  }, [config])

  // Aplicar Layout
  function handleSetLayout (layout) {
    document.querySelector('.grid').removeAttribute('style')
    setConfig({
      ...config,
      layout
    })
  }

  function changeFontSize (e) {
    setConfig((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        fontSize: e.target.value
      }
    }))
  }

  function changeLineNumber (e) {
    setConfig((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        lineNumbers: e.target.value
      }
    }))
  }

  function changeWordWrap (e) {
    setConfig((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        wordWrap: e.target.value
      }
    }))
  }

  function changeMiniMap (e) {
    setConfig((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        minimap: {
          ...prevState.options.minimap,
          enabled: e.target.value
        }
      }
    }))
  }

  function changeClearConsole (e) {
    setConfig((prevState) => ({
      ...prevState,
      clearConsole: e.target.value
    }))
  }

  return (
    <section className='opciones'>

      <h2>Configuración</h2>
      <h3>Diseño</h3>
      <div className='layouts'>
        <button name='default' title='Default' onClick={() => handleSetLayout('default')} />
        <button name='vertical' title='Vertical' onClick={() => handleSetLayout('vertical')} />
        <button name='horizontal' title='Horizontal' onClick={() => handleSetLayout('horizontal')} />
        <button name='bottom' title='Bottom' onClick={() => handleSetLayout('bottom')} />
        <button name='top' title='Top' onClick={() => handleSetLayout('top')} />
        <button name='left' title='Left' onClick={() => handleSetLayout('left')} />
        <button name='right' title='Right' onClick={() => handleSetLayout('right')} />
      </div>
      <label htmlFor='font-size'>Tamaño de fuente</label> {/* Tmaño de Fuente */}
      <select
        name='font-size'
        defaultValue={config.options.fontSize}
        value={config.options.fontSize}
        onChange={changeFontSize}
      >
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
        <option value={13}>13</option>
        <option value={14}>14</option>
        <option value={15}>15</option>
        <option value={16}>16</option>
        <option value={17}>17</option>
        <option value={18}>18</option>
        <option value={19}>19</option>
        <option value={20}>20</option>
        <option value={21}>21</option>
        <option value={22}>22</option>
        <option value={23}>23</option>
        <option value={24}>24</option>
        <option value={25}>25</option>
        <option value={26}>26</option>
        <option value={27}>27</option>
        <option value={28}>28</option>
        <option value={29}>29</option>
        <option value={30}>30</option>
        <option value={31}>31</option>
        <option value={32}>32</option>
      </select>
      <label htmlFor='line-number'>Número de linea</label> {/* Número de linea */}
      <select
        name='line-number'
        defaultValue={config.options.lineNumbers}
        value={config.options.lineNumbers}
        onChange={changeLineNumber}
      >
        <option value='on'>Habilitado</option>
        <option value='off'>Desabilitado</option>
      </select>
      <label htmlFor='wordwrap'>WordWrap</label> {/* WordWrap */}
      <select
        name='wordwrap'
        defaultValue={config.options.wordWrap}
        value={config.options.wordWrap}
        onChange={changeWordWrap}
      >
        <option value='on'>Habilitado</option>
        <option value='off'>Desabilitado</option>
        <option value='wordWrapColumn'>WordWrap Column</option>
        <option value='bounded'>Bounded</option>
      </select>
      <label htmlFor='minimap'>Mini mapa</label> {/* Mini mapa */}
      <select
        name='minimap'
        defaultValue={config.options.minimap.enabled}
        value={config.options.minimap.enabled}
        onChange={changeMiniMap}
      >
        <option value>Habilitado</option>
        <option value={false}>Desabilitado</option>
      </select>
      <label htmlFor='clearConsole'>Limpiar Consola</label> {/* Limpiar Consola */}
      <select
        name='clearConsole'
        defaultValue={config.clearConsole}
        value={config.clearConsole}
        onChange={changeClearConsole}
      >
        <option value>Habilitado</option>
        <option value={false}>Desabilitado</option>
      </select>

    </section>
  )
}
