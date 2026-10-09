import { SLIDE_THEMES } from '../themes'
import { CODEBOX_WIDTHS } from '../widths'

const SYNTAX_THEMES = [
  ['dark-plus', 'Dark+'], ['github-dark', 'GitHub Dark'], ['github-light', 'GitHub Light'],
  ['monokai', 'Monokai'], ['nord', 'Nord'], ['one-dark-pro', 'One Dark Pro'],
  ['dracula', 'Dracula'], ['material-theme-darker', 'Material Dark'], ['min-dark', 'Min Dark'],
  ['slack-dark', 'Slack Dark'], ['tokyo-night', 'Tokyo Night'],
]

export default function Controls({ settings, selectedTheme, onTheme, onSettingChange, onClear, code, onCode, header, onHeader }) {
  const color = (key, label) => <label className="setting-row">{label}<input aria-label={label} type="color" value={settings[key]} onChange={e => onSettingChange(key, e.target.value)} /></label>
  const range = (key, label, min, max, step, suffix = '') => <label className="range-row">
    <span>{label}<output>{settings[key]}{suffix}</output></span>
    <input aria-label={label} type="range" min={min} max={max} step={step} value={settings[key]} onChange={e => onSettingChange(key, Number(e.target.value))} />
  </label>
  const toggle = (key, label) => <label className="setting-row">{label}<input type="checkbox" checked={settings[key]} onChange={e => onSettingChange(key, e.target.checked)} /></label>

  return <aside className="sidebar">
    <section className="control-section">
      <h2>Slide theme</h2>
      <div className="theme-list">{SLIDE_THEMES.map(preset => <button key={preset.id} type="button" className="theme-button" aria-pressed={selectedTheme === preset.id} onClick={() => onTheme(preset.id)}>
        <span className="theme-swatch" style={{ backgroundColor: preset.settings.pageColor, color: preset.settings.dotColor }} />
        <span><strong>{preset.name}</strong><small>{preset.description}</small></span>
      </button>)}</div>
    </section>
    <section className="control-section">
      <div className="select-row">
        <label>Language<select value={settings.language} onChange={e => onSettingChange('language', e.target.value)}>
          <option value="html">HTML</option><option value="css">CSS</option><option value="javascript">JavaScript</option><option value="jsx">React / JSX</option>
        </select></label>
        <label>Highlighting<select value={settings.theme} onChange={e => onSettingChange('theme', e.target.value)}>{SYNTAX_THEMES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      <div className="text-label"><input aria-label="Title (optional)" value={header} onChange={e => onHeader(e.target.value)} placeholder="Title (optional)" /></div>
      <h2 id="code-heading">Code</h2>
      <div className="code-editor">
        <textarea aria-labelledby="code-heading" spellCheck={false} value={code} onChange={e => onCode(e.target.value)} />
        <button type="button" className="clear-code" onClick={onClear} aria-label="Clear code" title="Clear code">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </div>
      {range('size', 'Font size', 20, 150, 1, 'px')}
      <label className="text-label">Codebox Width
        <select aria-label="Codebox Width" value={settings.widthMode} onChange={e => onSettingChange('widthMode', e.target.value)}>
          <option value="auto">Auto</option>
          {CODEBOX_WIDTHS.map(({ id, label, percent }) => <option key={id} value={id}>{label} ({percent}%)</option>)}
        </select>
      </label>
      {toggle('hasNumbers', 'Line numbers')}
    </section>
    <details className="control-section"><summary>Background & animation</summary>
      {color('pageColor', 'Slide color')}{color('dotColor', 'Dot color')}
      {toggle('showGrid', 'Show dotted grid')}{toggle('animateDots', 'Animate dots')}
    </details>
    <details className="control-section"><summary>Codebox appearance</summary>
      {color('bgColor', 'Box color')}{range('bgAlpha', 'Box opacity', 0, 1, .05)}
      {toggle('hasBorder', 'Show border')}{color('borderColor', 'Border color')}
      {range('borderAlpha', 'Border opacity', 0, 1, .05)}{range('borderWidth', 'Border width', 0, 1.5, .025, 'em')}
    </details>
  </aside>
}
