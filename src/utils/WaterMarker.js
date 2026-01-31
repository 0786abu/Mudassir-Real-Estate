import sharp from "sharp";

const addTextWatermark = async (imageBuffer) => {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();

  // Create SVG for text watermark
  const fontSize = Math.floor(meta.width * 0.08); // adjust size relative to image width
  const svg = `
    <svg width="${meta.width}" height="${meta.height}">
      <text x="50%" y="50%" 
            font-size="${fontSize}" 
            font-family="Arial, sans-serif" 
            font-weight="bold" 
            fill="rgba(255, 255, 255, 0.3)" 
            text-anchor="middle" 
            dominant-baseline="middle">
        PakEarth.com
      </text>
    </svg>
  `;

  return image
    .composite([
      {
        input: Buffer.from(svg),
        gravity: "center",
      },
    ])
    .webp({ quality: 90 })
    .toBuffer();
};

export default addTextWatermark;
