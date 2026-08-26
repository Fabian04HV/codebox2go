import { useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import CodeBox from './components/CodeBox'
import { toPng } from 'html-to-image'
import download from 'downloadjs';
import Controls from './components/Controls';

const DEFAULT_SETTINGS = {
  language: 'css',
  theme: 'dark-plus',
  hasBorder: true,
  hasHeader: true,
  hasNumbers: false,
  size: 80,
  borderColor: '#ffffff',
  borderWidth: 0.1,
  borderAlpha: 0.3,
  bgColor: '#1f1f1f',
  bgAlpha: 1
}

function App() {
  const codeBoxRef = useRef(null)
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS })
  const [exportSize, setExportSize] = useState('')
  const [header, setHeader] = useState('')
  const [code, setCode] = useState('')
  const [fileName, setFileName] = useState('')

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  function updateExportSize() {
    const codebox = codeBoxRef.current 
    if(!codebox) return;

    const width = Math.ceil(codebox.getBoundingClientRect().width)
    const height = Math.ceil(codebox.getBoundingClientRect().height)
    
    setExportSize(`${width} × ${height}px`)
  }

  useLayoutEffect(() => {
    const codebox = codeBoxRef.current
    if(!codebox) return;

    const observer = new ResizeObserver(() => {
      updateExportSize()
    })

    observer.observe(codebox)
    updateExportSize()

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleFileName = (e) => { setFileName( e.target.value ) }
  const handleReset = () => { setSettings({ ...DEFAULT_SETTINGS }) }
  const handleClear = () => { setCode(''); setHeader('') }
  const handleExport = () => {
    if(!codeBoxRef.current) return

    toPng(codeBoxRef.current, {
      pixelRatio: 1,
      cacheBust: true
    })
    .then((dataUrl) => download(dataUrl, fileName !== '' ? `${fileName.trim()}`: `codebox2go-${exportSize}.png`))
    .catch(error => console.error(error))
  }

  return (
    <div className='App'>
      <Controls
        settings={settings}
        onSettingChange={updateSetting}
        onReset={handleReset}
        onClear={handleClear}
        onExport={handleExport}
      />
      <main>     
        <header>
          <h2>Result: <span className='export-size-display'>{ exportSize }</span></h2>
          <div>
            <input type="text" placeholder='file name' onChange={handleFileName} value={fileName}/>
            <button type='button' id='export-button' className='cta' onClick={handleExport}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-328.46 309.23-499.23l42.16-43.38L450-444v-336h60v336l98.61-98.61 42.16 43.38L480-328.46ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-108.46h60v108.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-108.46h60v108.46Q780-222 759-201q-21 21-51.31 21H252.31Z"/></svg><span>Download</span></button>
          </div>
        </header>
        <CodeBox 
          settings={settings} 
          ref={codeBoxRef}
          code={code}
          header={header}
          onCodeChange={setCode}
          onHeaderChange={setHeader}
        />
      </main>
    </div>
  )
}

export default App