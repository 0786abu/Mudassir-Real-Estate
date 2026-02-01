import sharp from "sharp";

const escapeXML = (str) =>
  str.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&apos;");

const addWatermark = async (imageBuffer, text = "PakEarth.com") => {
  const metadata = await sharp(imageBuffer).metadata();

  const width = metadata.width || 800;
  const height = metadata.height || 600;
  const fontSize = Math.floor(width * 0.08);

  const safeText = escapeXML(text);

  const svg = `
    <svg width="${width}" height="${height}">
      <style>
        .text {
          fill: white;
          font-size: ${fontSize}px;
          font-weight: bold;
          opacity: 0.35;
          font-family: sans-serif;
        }
      </style>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="text"
      >
        ${safeText}
      </text>
    </svg>
  `;

  return sharp(imageBuffer)
    .composite([{ input: Buffer.from(svg) }])
    .webp({ quality: 90 })
    .toBuffer();
};

export default addWatermark;
