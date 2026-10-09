const shared = {
  theme: 'dark-plus', hasBorder: true, hasNumbers: false, size: 59,
  borderColor: '#ffffff', borderWidth: 0.1, borderAlpha: 0.5,
  bgAlpha: 1, showGrid: true, animateDots: true,
}

export const SLIDE_THEMES = [
  { id: 'midnight', name: 'Midnight Focus', description: 'The original saved style',
    settings: { ...shared, pageColor: '#0c1218', bgColor: '#10171e', dotColor: '#6f729b' } },
  { id: 'blue', name: 'Modern Blue', description: 'A deeper, richer blue',
    settings: { ...shared, pageColor: '#20295b', bgColor: '#10142e', dotColor: '#7584c5' } },
  { id: 'classic', name: 'Classic Dark', description: 'The original neutral palette',
    settings: { ...shared, pageColor: '#181818', bgColor: '#1f1f1f', dotColor: '#555555', borderAlpha: 0.3 } },
  { id: 'purple', name: 'Calm Purple', description: 'A soft, quiet purple',
    settings: { ...shared, pageColor: '#211d3d', bgColor: '#130f26', dotColor: '#8276b5' } },
  { id: 'vibrant-purple', name: 'Vibrant Purple', description: 'Rich purple with a dark codebox',
    settings: { ...shared, pageColor: '#321081', bgColor: '#130f26', dotColor: '#6f749f' } },
]

export const DEFAULT_SETTINGS = { ...SLIDE_THEMES[0].settings, language: 'jsx', widthMode: 'auto' }
export const SAMPLE_CODE = `function LikeButton({ label }) {
  return <button>{label}</button>
}

<LikeButton label="Like this post" />`

// Exact positions and deterministic timing from Midnight Grid Codebox v1.
const xs = [26,86,147,207,268,327,388,448,509,568,629,689,750,810,870,931,990,1051,1111,1172,1231,1292,1352,1413,1472,1534,1594,1654,1714,1774,1835,1894]
const ys = [27,88,148,208,268,329,389,450,509,570,630,691,750,811,871,931,992,1052]
function createDots() {
  let seed = 20261006
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  return ys.flatMap(y => xs.map(x => {
    const duration = [4,5,6,10][Math.floor(random() * 4)]
    const delay = -(random() * duration)
    const low = .02 + random() * .04
    const high = .8 + random() * .2
    const still = low + (high - low) * random()
    return { x, y, duration, delay: delay.toFixed(4), low: low.toFixed(4), high: high.toFixed(4), still: still.toFixed(4) }
  }))
}
export const GRID_DOTS = createDots()

