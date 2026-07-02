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
      <button type='button' onClick={onReset}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M677.23-63.54q-9.08-3.54-16.54-11L504.92-230.31Q490-244.62 490-265q0-20.38 14.92-35.31L653.23-448l-75.69-75.69 41.77-42.15 267.15 265.53q7.46 7.46 11 16.54 3.54 9.08 3.54 18.15 0 9.08-3.54 18.47-3.54 9.38-11 16.84L730.69-74.54q-7.46 7.46-16.84 11Q704.46-60 695.38-60q-9.07 0-18.15-3.54ZM558-269.23h273.62L695-405.85 558-269.23ZM180-140v-60h113.23q-69.3-45-111.27-118.27Q140-391.54 140-480q0-70.77 26.77-132.61 26.77-61.85 72.77-107.85 46-46 107.85-72.77Q409.23-820 480-820q118.61 0 208.81 71.42Q779-677.15 807.92-567.69h-62.23q-27.54-84.54-99.57-138.43Q574.08-760 480-760q-117 0-198.5 81.5T200-480q0 78.15 38.46 141.81 38.46 63.65 101.54 99.34V-360h60v220H180Z"/></svg><span>Reset Styles</span></button>
      <button type='button' onClick={onClear}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M140-302.31v-60h525v60H140ZM217.31-450v-60h525v60h-525ZM295-597.69v-60h525v60H295Z"/></svg><span>Clear Inputs</span></button>
      <button className="cta" type='button' onClick={onExport}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-328.46 309.23-499.23l42.16-43.38L450-444v-336h60v336l98.61-98.61 42.16 43.38L480-328.46ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-108.46h60v108.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-108.46h60v108.46Q780-222 759-201q-21 21-51.31 21H252.31Z"/></svg></button>
    </footer>
  </aside> 
)}