import sharp from "sharp";
import fs from "fs";

const addTextWatermark = async (imageBuffer) => {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();

  // Create SVG for text watermark
  const fontSize = Math.floor(meta.width * 0.08); // adjust size relative to image width
  const fontData = fs.readFileSync("public/assets/images/Roboto-Bold.ttf").toString("base64");
  const svg = `
<svg width="${meta.width}" height="${meta.height}">
  <defs>
    <style type="text/css">
      @font-face {
        font-family: 'Roboto';
        src: url('data:font/ttf;base64,${fontData}') format('truetype');
        font-weight: bold;
      }
    </style>
  </defs>
  <text x="50%" y="50%" 
        font-size="${fontSize}" 
        font-family="Roboto" 
        font-weight="bold" 
        fill="rgba(255, 255, 255, 0.35)" 
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
