import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { canvasToPngBlob, canvasToPngBuffer } from './rasterize'
import { encodeIco } from './icoEncoder'

export interface FaviconSource {
  /** Renders a canvas at the given pixel size */
  render: (size: number) => Promise<HTMLCanvasElement> | HTMLCanvasElement
  appName: string
  themeColor: string
  bgColor: string
}

export const ICO_SIZES = [16, 32, 48]
export const PNG_SIZES = [16, 32, 180, 192, 512]

export const PNG_FILENAMES: Record<number, string> = {
  16: 'favicon-16x16.png',
  32: 'favicon-32x32.png',
  180: 'apple-touch-icon.png',
  192: 'android-chrome-192x192.png',
  512: 'android-chrome-512x512.png',
}

export function buildManifest(appName: string, themeColor: string, bgColor: string) {
  return JSON.stringify(
    {
      name: appName,
      short_name: appName,
      icons: [
        { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: themeColor,
      background_color: bgColor,
      display: 'standalone',
    },
    null,
    2,
  )
}

export function buildHtmlSnippet(): string {
  return [
    '<link rel="icon" type="image/x-icon" href="/favicon.ico">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    '<link rel="manifest" href="/site.webmanifest">',
  ].join('\n')
}

export function buildAttribution(licenseNote?: string): string {
  const lines = [
    'FaviCraft — generated favicon package',
    `Generated: ${new Date().toISOString()}`,
  ]
  if (licenseNote) lines.push('', licenseNote)
  return lines.join('\n')
}

export async function buildFaviconZip(
  source: FaviconSource,
  opts?: { licenseNote?: string; filenamePrefix?: string },
) {
  const zip = new JSZip()

  const icoImages = await Promise.all(
    ICO_SIZES.map(async (size) => ({
      size,
      pngData: await canvasToPngBuffer(await source.render(size)),
    })),
  )
  const icoBlob = encodeIco(icoImages)
  zip.file('favicon.ico', icoBlob)

  for (const size of PNG_SIZES) {
    const canvas = await source.render(size)
    const blob = await canvasToPngBlob(canvas)
    zip.file(PNG_FILENAMES[size], blob)
  }

  zip.file(
    'site.webmanifest',
    buildManifest(source.appName, source.themeColor, source.bgColor),
  )
  zip.file('favicon-tags.html', buildHtmlSnippet())
  zip.file('about.txt', buildAttribution(opts?.licenseNote))

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `${opts?.filenamePrefix ?? 'favicon-package'}.zip`)
}
