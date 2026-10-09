import { hexToRgba } from '../utils'
import { useLayoutEffect, useRef } from 'react'
import { CODEBOX_WIDTHS } from '../widths'

export default function CodeBox({ settings, code, header, html }) {
  const boxRef = useRef(null)
  useLayoutEffect(() => {
    const box = boxRef.current
    const body = box.querySelector('.code-body')
    const content = box.querySelector('.highlighted-code')
    const pre = content.querySelector('pre')
    const numbers = box.querySelector('.line-numbers')
    const measure = () => {
      // Computed widths are in native slide pixels, independent of preview zoom.
      const px = (style, property) => parseFloat(style[property]) || 0
      const bodyStyle = getComputedStyle(body)
      const boxStyle = getComputedStyle(box)
      const codeWidth = px(getComputedStyle(pre), 'width')
      const gutter = numbers ? px(getComputedStyle(numbers), 'width') + px(bodyStyle, 'columnGap') : 0
      const needed = codeWidth + gutter + px(bodyStyle, 'paddingLeft') + px(bodyStyle, 'paddingRight')
        + px(boxStyle, 'borderLeftWidth') + px(boxStyle, 'borderRightWidth')
      const preset = settings.widthMode === 'auto'
        ? CODEBOX_WIDTHS.find(item => box.parentElement.clientWidth * item.percent / 100 >= needed) || CODEBOX_WIDTHS.at(-1)
        : CODEBOX_WIDTHS.find(item => item.id === settings.widthMode) || CODEBOX_WIDTHS.at(-1)
      box.style.width = `${preset.percent}%`
      content.classList.toggle('is-overflowing', codeWidth > px(getComputedStyle(content), 'width') + 0.1)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(pre)
    observer.observe(box)
    if (numbers) observer.observe(numbers)
    document.fonts.addEventListener('loadingdone', measure)
    measure()
    return () => {
      observer.disconnect()
      document.fonts.removeEventListener('loadingdone', measure)
    }
  }, [settings, code, html])

  const fadeColor = [1, 3, 5].map(index => Math.round(
    parseInt(settings.bgColor.slice(index, index + 2), 16) * settings.bgAlpha
    + parseInt(settings.pageColor.slice(index, index + 2), 16) * (1 - settings.bgAlpha),
  )).join(', ')

  return <section ref={boxRef} className="CodeBox" aria-label="Codebox" style={{
    '--fade-color': `rgb(${fadeColor})`,
    fontSize: `${settings.size}px`,
    backgroundColor: hexToRgba(settings.bgColor, settings.bgAlpha),
    border: settings.hasBorder ? `${settings.borderWidth}em solid ${hexToRgba(settings.borderColor, settings.borderAlpha)}` : 'none',
  }}>
    <div className="code-header">
      <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
      {header && <span className="code-title">{header}</span>}
    </div>
    <div className="code-body">
      {settings.hasNumbers && <div className="line-numbers" aria-hidden="true">
        {code.split('\n').map((_, index) => <span key={index}>{index + 1}</span>)}
      </div>}
      {html ? <div className="highlighted-code" dangerouslySetInnerHTML={{ __html: html }} />
        : <div className="highlighted-code"><pre><code>{code || ' '}</code></pre></div>}
    </div>
  </section>
}
