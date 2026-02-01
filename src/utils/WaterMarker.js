import sharp from "sharp";

const addWatermark = async (imageBuffer) => {
  const metadata = await sharp(imageBuffer).metadata();

  const fontSize = Math.floor(metadata.width * 0.08);

  const svg = `
    <svg width="${metadata.width}" height="${metadata.height}">
      <style>
        .text {
          fill: white;
          font-size: ${fontSize}px;
          font-weight: bold;
          opacity: 0.35;
          font-family: Arial, sans-serif;
        }
      </style>
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="text"
      >
        PakEarth.com
      </text>
    </svg>
  `;

  return sharp(imageBuffer)
    .composite([{ input: Buffer.from(svg), gravity: "center" }])
    .webp({ quality: 90 })
    .toBuffer();
};

export default addWatermark;
