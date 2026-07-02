const THEME_OPTIONS = [
  { value: 'dark-plus', label: 'Dark+' },
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'nord', label: 'Nord' },
  { value: 'one-dark-pro', label: 'One Dark Pro' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'material-theme-darker', label: 'Material Dark' },
  { value: 'min-dark', label: 'Min Dark' },
  { value: 'slack-dark', label: 'Slack Dark' },
  { value: 'tokyo-night', label: 'Tokyo Night' },
]

export default function Controls({ settings, onSettingChange, onReset, onClear, onExport }) {
  return (
  <aside className="form-layout">
    <div className="controls">
      <select id="theme-select" value={settings.theme} onChange={(e) => onSettingChange('theme', e.target.value)}>
        {THEME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <select id="language-select" value={settings.language} onChange={(e) => onSettingChange('language', e.target.value)}>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
        <option value="jsx">React</option>
      </select>
      <label htmlFor="hasHeaderInput">
        <span>Header</span>
        <input onChange={(e) => onSettingChange('hasHeader', e.target.checked)} checked={settings.hasHeader} id='hasHeaderInput' type='checkbox'/>
      </label>
      <label htmlFor="hasNumbersInput">
        <span>Line Numbers</span>
        <input onChange={(e) => onSettingChange('hasNumbers', e.target.checked)} checked={settings.hasNumbers} id='hasNumbersInput' type='checkbox'/>
      </label>         
      <div className="span-3">
        <label htmlFor="border-color-input">
          <span>Border Color</span>
          <input id="border-color-input" value={settings.borderColor} onChange={(e) => onSettingChange('borderColor', e.target.value)} type='color'/>
        </label>
        <label>
          <span>Alpha: {settings.borderAlpha}</span>
          <input value={settings.borderAlpha} onChange={(e) => onSettingChange('borderAlpha', Number(e.target.value))} type='range' max={1} step={0.05}/>
        </label>
        <label>
          <span>Width: {settings.borderWidth}em</span>
          <input value={settings.borderWidth} onChange={(e) => onSettingChange('borderWidth', Number(e.target.value))} type='range' max={1.5} step={0.025}/>
        </label>
      </div> 
      <div className='span-3'>
        <label htmlFor='bg-color-input'>
          <span>Box Color</span>
          <input id='bg-color-input' value={settings.bgColor} onChange={(e) => onSettingChange('bgColor', e.target.value)} type="color"/>
        </label>
        <label>
          <span>Alpha: {settings.bgAlpha}</span>
          <input onChange={(e) => onSettingChange('bgAlpha', Number(e.target.value))} value={settings.bgAlpha} type="range" max={1} step={0.05}/>
        </label>
        <label> 
          <span>Size: {settings.size}</span>
          <input onChange={(e) => onSettingChange('size', Number(e.target.value))} id="size" type="range" min={20} max={150} value={settings.size}/>
        </label>
      </div>
    </div>    
    <footer>
      <button type='button' onClick={onReset}>Reset</button>
      <button type='button' onClick={onClear}>Clear</button>
      <button type='button' id='export-button' className='cta' onClick={onExport}>Export</button>
    </footer>
  </aside> 
)}