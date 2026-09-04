// Encodes one or more PNG buffers into a multi-image .ico container.
// ICO format: 6-byte header, then N 16-byte directory entries, then raw PNG data per image.

export interface IcoImageInput {
  size: number
  pngData: ArrayBuffer
}

export function encodeIco(images: IcoImageInput[]): Blob {
  const headerSize = 6
  const dirEntrySize = 16
  const dirSize = dirEntrySize * images.length
  let dataOffset = headerSize + dirSize

  const dataOffsets: number[] = []
  let totalDataSize = 0
  for (const img of images) {
    dataOffsets.push(dataOffset + totalDataSize)
    totalDataSize += img.pngData.byteLength
  }

  const buffer = new ArrayBuffer(headerSize + dirSize + totalDataSize)
  const view = new DataView(buffer)

  // ICONDIR header
  view.setUint16(0, 0, true) // reserved
  view.setUint16(2, 1, true) // type: 1 = ICO
  view.setUint16(4, images.length, true)

  let offset = headerSize
  images.forEach((img, i) => {
    const dim = img.size >= 256 ? 0 : img.size // 0 means 256
    view.setUint8(offset, dim) // width
    view.setUint8(offset + 1, dim) // height
    view.setUint8(offset + 2, 0) // color palette
    view.setUint8(offset + 3, 0) // reserved
    view.setUint16(offset + 4, 1, true) // color planes
    view.setUint16(offset + 6, 32, true) // bits per pixel
    view.setUint32(offset + 8, img.pngData.byteLength, true) // size of image data
    view.setUint32(offset + 12, dataOffsets[i], true) // offset of image data
    offset += dirEntrySize
  })

  images.forEach((img, i) => {
    const bytes = new Uint8Array(img.pngData)
    new Uint8Array(buffer, dataOffsets[i], bytes.byteLength).set(bytes)
  })

  return new Blob([buffer], { type: 'image/x-icon' })
}
