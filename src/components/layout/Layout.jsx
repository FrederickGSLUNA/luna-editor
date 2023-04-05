import Split from 'react-split-grid'
import { useContext } from 'react'
import './style.css'
import { ConfigContext } from '../../App'

export default function Layout (props) {
  const [config] = useContext(ConfigContext)

  const layout = config.layout

  return (
    <Split
      render={({
        getGridProps,
        getGutterProps
      }) => (
        <div className={'grid ' + layout} {...getGridProps()}>

          <div id='html' className='editor'><div className='language-icon' />{props.html}</div> {/* -------------HTML------------- */}

          {layout === 'horizontal'
            ? <div className='gutter-row gutter-row-1' {...getGutterProps('row', 1)} />
            : ''}
          {
            layout === 'default' ||
            layout === 'vertical' ||
            layout === 'left' ||
            layout === 'right' ||
            layout === 'bottom' ||
            layout === 'top'
              ? <div className='gutter-col gutter-col-1' {...getGutterProps('column', 1)} />
              : ''
          }

          <div id='css' className='editor'><div className='language-icon' />{props.css}</div> {/* -------------CSS------------- */}

          {
          layout === 'horizontal'
            ? <div className='gutter-row gutter-row-3' {...getGutterProps('row', 3)} />
            : ''
          }
          {
            layout === 'vertical' ||
            layout === 'bottom' ||
            layout === 'top'
              ? <div className='gutter-col gutter-col-3' {...getGutterProps('column', 3)} />
              : ''
          }
          {
            layout === 'left' ||
            layout === 'right'
              ? <div className='gutter-row gutter-row-1' {...getGutterProps('row', 1)} />
              : ''
          }

          <div id='js' className='editor'><div className='language-icon' />{props.js}</div> {/* -------------JS------------- */}

          {
            layout === 'default' ||
            layout === 'bottom' ||
            layout === 'top'
              ? <div className='gutter-row gutter-row-1' {...getGutterProps('row', 1)} />
              : ''
          }
          {
          layout === 'horizontal'
            ? <div className='gutter-row gutter-row-5' {...getGutterProps('row', 5)} />
            : ''
          }
          {
            layout === 'vertical'
              ? <div className='gutter-col gutter-col-5' {...getGutterProps('column', 5)} />
              : ''
          }
          {
              layout === 'left' ||
              layout === 'right'
                ? <div className='gutter-row gutter-row-3' {...getGutterProps('row', 3)} />
                : ''
          }
          <div id='resultado'>{props.resultado}</div> {/* -------------RESULTADO------------- */}

        </div>
      )}
    />
  )
}
