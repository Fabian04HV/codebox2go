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
  hasNumbers: true,
  size: 32,
  borderColor: '#ffffff',
  borderWidth: .075,
  borderAlpha: 0.1,
  bgColor: '#1f1f1f',
  bgAlpha: 1
}

function App() {
  const codeBoxRef = useRef(null)
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS })
  const [exportSize, setExportSize] = useState('')
  const [header, setHeader] = useState('')
  const [code, setCode] = useState('')

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

  const handleReset = () => { setSettings({ ...DEFAULT_SETTINGS }) }
  const handleClear = () => { setCode(''); setHeader('') }
  const handleExport = () => {
    if(!codeBoxRef.current) return

    toPng(codeBoxRef.current, {
      pixelRatio: 1,
      cacheBust: true
    })
    .then((dataUrl) => download(dataUrl, `codebox-${exportSize}.png`))
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
        <h2>Result: <span className='export-size-display'>{ exportSize }</span></h2>
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