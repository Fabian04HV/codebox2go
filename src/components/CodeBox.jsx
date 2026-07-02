import { useEffect, useState } from "react"
import { codeToHtml } from "shiki"
import { hexToRgba } from "../utils"

export default function CodeBox({ settings, ref, code, header, onCodeChange, onHeaderChange }) {

  const [html, setHTML] = useState("")

  const styles = {
    fontSize: `${settings.size}px`,
    backgroundColor: hexToRgba(settings.bgColor, settings.bgAlpha),
    border: settings.hasBorder ? `${settings.borderWidth}em solid ${hexToRgba(settings.borderColor, settings.borderAlpha)}` : 'none'
  }

  useEffect(() => {
    let cancelled = false

    async function highlight() {
      try {
        const highlighted = await codeToHtml(code, {
          lang: settings.language, 
          theme: settings.theme
        })
        if(!cancelled) setHTML(highlighted)
      } catch (error) {
        console.error(error) 
        if(!cancelled) setHTML('')
      } 
    }

    highlight()

    return () => {
      cancelled = true
    }
  }, [code, settings.language, settings.theme])

  const handleHeaderInput = (e) => { onHeaderChange(e.target.value) }
  const handleCodeInput = (e) => { onCodeChange(e.target.value) }
  
  const lineCount = code != "" ? code.split('\n').length : 0;

  return <div ref={ref} className="CodeBox" style={styles}>
    { settings.hasHeader && (
      <div className="code-header">
        <div className="dots"><span></span><span></span><span></span></div>
        <input onChange={handleHeaderInput} size={1} type="text" value={header}/>
      </div>
    )}
    <div className="code-body">

      {settings.hasNumbers && <label htmlFor="codebody" className="line-numbers">
        { Array.from({ length: lineCount }, (_, index) => {
          return <span key={index} className="line-number">{index + 1}</span>
        })}
      </label>}
      <div className="stacked-grid">
        <textarea value={code} onChange={handleCodeInput} id="codebody" rows={1}></textarea>
        <div className="colored-text" dangerouslySetInnerHTML={{__html: html}}></div>
      </div>
    </div>
  </div>
}