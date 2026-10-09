import { GRID_DOTS } from '../themes'
import CodeBox from './CodeBox'

export default function Slide({ ref, settings, code, header, html }) {
  return <div ref={ref} className="slide-stage" aria-label="1920 by 1080 slide" style={{
    backgroundColor: settings.pageColor, '--dot-color': settings.dotColor,
  }}>
    {settings.showGrid && <div className={`dot-grid ${settings.animateDots ? '' : 'is-still'}`} aria-hidden="true">
      {GRID_DOTS.map(dot => <i key={`${dot.x}-${dot.y}`} className="grid-dot" style={{
        left: dot.x, top: dot.y, '--duration': `${dot.duration}s`, '--delay': `${dot.delay}s`,
        '--low': dot.low, '--high': dot.high, '--still': dot.still,
      }} />)}
    </div>}
    <CodeBox settings={settings} code={code} header={header} html={html} />
  </div>
}
