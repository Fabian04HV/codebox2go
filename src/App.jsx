import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { codeToHtml } from 'shiki'
import { toPng } from 'html-to-image'
import download from 'downloadjs'
import Controls from './components/Controls'
import Slide from './components/Slide'
import { DEFAULT_SETTINGS, SAMPLE_CODE, SLIDE_THEMES } from './themes'
import './App.css'

function App() {
  const frameRef = useRef(null)
  const slideRef = useRef(null)
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS })
  const [selectedTheme, setSelectedTheme] = useState('midnight')
  const [code, setCode] = useState(SAMPLE_CODE)
  const [header, setHeader] = useState('')
  const [fileName, setFileName] = useState('')
  const [highlight, setHighlight] = useState(null)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)
  const signature = JSON.stringify([code, settings.language, settings.theme])
  const ready = highlight?.signature === signature && !highlight.error

  useEffect(() => {
    const leaveFullscreen = event => {
      if (event.key === 'Escape' && document.fullscreenElement === frameRef.current) {
        document.exitFullscreen().catch(() => setError('Press Esc again to exit fullscreen.'))
      }
    }
    document.addEventListener('keydown', leaveFullscreen)
    return () => document.removeEventListener('keydown', leaveFullscreen)
  }, [])

  useEffect(() => {
    let cancelled = false
    codeToHtml(code || ' ', { lang: settings.language, theme: settings.theme }).then(html => {
      if (!cancelled) setHighlight({ signature, html })
    }).catch(() => {
      if (!cancelled) setHighlight({ signature, error: 'Could not highlight this code. Try a different language or highlighting theme.' })
    })
    return () => { cancelled = true }
  }, [code, settings.language, settings.theme, signature])

  useLayoutEffect(() => {
    const frame = frameRef.current
    const resize = () => frame.style.setProperty('--preview-scale', Math.min(frame.clientWidth / 1920, frame.clientHeight / 1080))
    const observer = new ResizeObserver(resize)
    observer.observe(frame)
    resize()
    return () => observer.disconnect()
  }, [])

  function applyTheme(id) {
    const preset = SLIDE_THEMES.find(theme => theme.id === id)
    setSelectedTheme(id)
    setSettings(previous => ({ ...previous, ...preset.settings }))
  }

  async function enterFullscreen() {
    setError('')
    try {
      if (!frameRef.current.requestFullscreen) throw new Error('unsupported')
      await frameRef.current.requestFullscreen({ navigationUI: 'hide' })
    } catch {
      setError('Fullscreen is unavailable in this browser window. Open this page in Chrome, Edge, or Firefox and try again.')
    }
  }

  async function exportCodeBox() {
    if (!ready || exporting) return
    setExporting(true)
    setError('')
    try {
      await document.fonts.ready
      const source = slideRef.current.querySelector('.CodeBox')
      // Use native layout dimensions, independent of the preview's zoom.
      const style = getComputedStyle(source)
      const width = parseFloat(style.width)
      const height = parseFloat(style.height)
      const dataUrl = await toPng(source, {
        width,
        height,
        pixelRatio: 2,
        // Leave the canvas transparent while retaining the codebox's own fill.
        style: { margin: '0', transform: 'none' },
      })
      const cleanName = Array.from(fileName).filter(character => character.charCodeAt(0) >= 32).join('')
      const name = cleanName.trim().replace(/[<>:"/\\|?*]/g, '-').replace(/\.png$/i, '') || `${selectedTheme}-codebox`
      download(dataUrl, `${name}.png`)
    } catch {
      setError('The codebox could not be downloaded. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  return <div className="App">
    <Controls settings={settings} selectedTheme={selectedTheme} onTheme={applyTheme}
      onSettingChange={(key, value) => setSettings(previous => ({ ...previous, [key]: value }))}
      onClear={() => setCode('')}
      code={code} onCode={setCode} header={header} onHeader={setHeader} />
    <main className="workspace">
      <header className="preview-toolbar"><h1>CodeBox2GO</h1>
        <div className="preview-actions"><input className="export-filename" aria-label="File name (optional)" title="Optional file name" placeholder="File name (optional)" value={fileName} onChange={e => setFileName(e.target.value)} /><button className="cta codebox-download" onClick={exportCodeBox} disabled={!ready || exporting} title="Download the codebox as a transparent PNG at 2× resolution"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg>{exporting ? 'Preparing…' : 'CodeBox Only'}</button></div>
      </header>
      {!ready && !highlight?.error && <p role="status">Preparing syntax highlighting…</p>}
      {(error || highlight?.error) && <p className="notice" role="alert">{error || highlight.error}</p>}
      <div className="preview-frame" ref={frameRef} style={{ backgroundColor: settings.pageColor }}>
        <Slide ref={slideRef} settings={settings} code={code} header={header} html={ready ? highlight.html : ''} />
        <button className="preview-fullscreen" onClick={enterFullscreen} disabled={!ready} aria-label="Open in fullscreen" title="Open in fullscreen">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e3e3e3" aria-hidden="true"><path d="M140-140v-300h60v198.23L718.23-760H520v-60h300v300h-60v-198.23L241.77-200H440v60H140Z" /></svg>
        </button>
      </div>
    </main>
  </div>
}
export default App
