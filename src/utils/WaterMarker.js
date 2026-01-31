import sharp from "sharp";
import fs from "fs";
import path from "path";

const addWatermark = async (imageBuffer) => {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();

  const fontSize = Math.floor(meta.width * 0.08);

  const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf");
const fontBuffer = fs.readFileSync(fontPath);
const fontBase64 = fontBuffer.toString("base64");


  const svg = `
<svg width="${meta.width}" height="${meta.height}">
  <defs>
    <style>
      @font-face {
        font-family: 'Roboto';
        src: url(data:font/ttf;base64,${fontBase64}) format('truetype');
        font-weight: bold;
      }
    </style>
  </defs>

  <text
    x="50%"
    y="50%"
    font-size="${fontSize}"
    font-family="Roboto"
    font-weight="bold"
    fill="rgba(255,255,255,0.35)"
    text-anchor="middle"
    dominant-baseline="middle"
  >
    PakEarth.com
  </text>
</svg>
`;


  return image
  .composite([{ input: Buffer.from(svg) }])
  .webp({ quality: 90 })
  .toBuffer();

};

export default addWatermark;
