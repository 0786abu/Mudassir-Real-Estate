import sharp from "sharp";
import fs from "fs";
import path from "path";

const addWatermark = async (imageBuffer) => {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();

  if (!meta.width || !meta.height) {
    throw new Error("Invalid image metadata");
  }

  // Watermark size relative to image
  const fontSize = Math.floor(meta.width * 0.08);

  // Load local font (IMPORTANT for Vercel)
  const fontPath = path.join(process.cwd(), "public/fonts/Roboto-Bold.ttf");
  const fontBuffer = fs.readFileSync(fontPath);
  const fontBase64 = fontBuffer.toString("base64");

  // SVG watermark (STRICT + VALID SVG)
  const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${meta.width}"
  height="${meta.height}"
>
  <defs>
    <style>
      @font-face {
        font-family: 'Roboto';
        src: url("data:font/truetype;base64,${fontBase64}") format("truetype");
        font-weight: 700;
      }
      text {
        font-family: 'Roboto';
        font-weight: 700;
        fill: #ffffff;
        fill-opacity: 0.35;
      }
    </style>
  </defs>

  <text
    x="50%"
    y="50%"
    font-size="${fontSize}"
    text-anchor="middle"
    dominant-baseline="middle"
  >
    PakEarth.com
  </text>
</svg>
`;

  // Rasterize SVG safely (Vercel compatible)
  const watermark = await sharp(Buffer.from(svg), {
    density: 96, // 👈 DO NOT increase
  })
    .resize(meta.width, meta.height)
    .toBuffer();

  // Composite watermark
  return image
    .composite([
      {
        input: watermark,
        top: 0,
        left: 0,
      },
    ])
    .webp({ quality: 90 })
    .toBuffer();
};

export default addWatermark;
