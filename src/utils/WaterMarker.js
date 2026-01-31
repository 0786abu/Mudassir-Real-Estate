import sharp from "sharp";
import fs from "fs";
import path from "path";

const addTextWatermark = async (imageBuffer) => {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();

  const fontSize = Math.floor(meta.width * 0.08);

  // ✅ Local font read (NO fetch)
  const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf");
  const fontBuffer = fs.readFileSync(fontPath);
  const fontData = fontBuffer.toString("base64");

  const svg = `
<svg width="${meta.width}" height="${meta.height}">
  <g transform="rotate(-30 ${meta.width/2} ${meta.height/2})">
    <text
      x="50%"
      y="50%"
      font-size="${fontSize}"
      font-family="sans-serif"
      font-weight="700"
      fill="rgba(255,255,255,0.25)"
      text-anchor="middle"
    >
      PakEarth.com
    </text>
  </g>
</svg>
`;

  return image
    .composite([{ input: Buffer.from(svg) }])
    .webp({ quality: 90 })
    .toBuffer();
};

export default addTextWatermark;
