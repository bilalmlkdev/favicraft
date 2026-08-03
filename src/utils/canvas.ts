// Canvas utilities
export const generateTextCanvasBlob = (
  size: number,
  textVal: string,
  fontFamily: string,
  fontColor: string,
  textBgColor: string,
  bgShape: string,
  fontWeight: string,
  fontSize: number,
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve(null);

    ctx.fillStyle = textBgColor;
    ctx.beginPath();
    let radius =
      bgShape === "Rounded" ? size * 0.22 : bgShape === "Circle" ? size / 2 : 0;
    // @ts-ignore
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();

    ctx.fillStyle = fontColor;
    ctx.font = `${fontWeight} ${(fontSize / 150) * size}px '${fontFamily}', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(textVal || "F", size / 2, size / 2 + size * 0.03);

    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
};

export const generateImageCanvasBlob = (
  size: number,
  image: string | null,
): Promise<Blob | null> => {
  return new Promise(async (resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return resolve(null);

    if (image) {
      const img = new window.Image();
      img.src = image;
      await new Promise((res) => {
        img.onload = res;
      });
      ctx.drawImage(img, 0, 0, size, size);
    } else {
      ctx.fillStyle = "#4F46E5";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, size * 0.6, size, size * 0.4);
    }

    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
};
