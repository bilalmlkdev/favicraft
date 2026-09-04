export type ShapeStyle = 'none' | 'circle' | 'rounded' | 'square'

export interface TextIconOptions {
  text: string
  fontFamily: string
  fontWeight: number
  textColor: string
  bgColor: string
  shape: ShapeStyle
}

export interface RenderTarget {
  size: number
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  size: number,
  bgColor: string,
  shape: ShapeStyle,
) {
  ctx.save()
  ctx.beginPath()
  if (shape === 'circle') {
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  } else if (shape === 'rounded') {
    const r = size * 0.22
    roundRectPath(ctx, 0, 0, size, size, r)
  } else if (shape === 'square') {
    ctx.rect(0, 0, size, size)
  } else {
    ctx.restore()
    return
  }
  ctx.closePath()
  ctx.fillStyle = bgColor
  ctx.fill()
  ctx.restore()
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
}

export function renderTextIcon(size: number, opts: TextIconOptions): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)

  drawBackground(ctx, size, opts.bgColor, opts.shape)

  const fontSize = Math.round(size * 0.56)
  ctx.font = `${opts.fontWeight} ${fontSize}px ${opts.fontFamily}`
  ctx.fillStyle = opts.textColor
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // slight optical baseline correction
  ctx.fillText(opts.text.slice(0, 3), size / 2, size / 2 + size * 0.02)

  return canvas
}

export function renderEmojiIcon(
  size: number,
  emoji: string,
  bgColor: string,
  shape: ShapeStyle,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)

  drawBackground(ctx, size, bgColor, shape)

  const fontSize = Math.round(size * 0.62)
  ctx.font = `${fontSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(emoji, size / 2, size / 2 + size * 0.03)

  return canvas
}

export async function renderImageIcon(
  size: number,
  source: HTMLImageElement,
  shape: ShapeStyle,
  bgColor: string,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)

  if (shape !== 'none') {
    drawBackground(ctx, size, bgColor, shape)
    ctx.save()
    ctx.beginPath()
    if (shape === 'circle') {
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    } else if (shape === 'rounded') {
      roundRectPath(ctx, 0, 0, size, size, size * 0.22)
    } else {
      ctx.rect(0, 0, size, size)
    }
    ctx.closePath()
    ctx.clip()
  }

  // cover-fit the source image into the square
  const sw = source.naturalWidth || source.width
  const sh = source.naturalHeight || source.height
  const scale = Math.max(size / sw, size / sh)
  const dw = sw * scale
  const dh = sh * scale
  const dx = (size - dw) / 2
  const dy = (size - dh) / 2
  ctx.drawImage(source, dx, dy, dw, dh)

  if (shape !== 'none') ctx.restore()

  return canvas
}

export async function renderSvgIcon(
  size: number,
  svgMarkup: string,
  bgColor: string,
  shape: ShapeStyle,
): Promise<HTMLCanvasElement> {
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  try {
    const img = await loadImage(url)
    return renderImageIcon(size, img, shape, bgColor)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function canvasToPngBuffer(canvas: HTMLCanvasElement): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) return reject(new Error('canvas toBlob failed'))
      resolve(await blob.arrayBuffer())
    }, 'image/png')
  })
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error('canvas toBlob failed'))
      resolve(blob)
    }, 'image/png')
  })
}
