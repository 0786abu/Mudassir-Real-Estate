import sharp from "sharp";

const escapeXML = (str) =>
  str.replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&apos;");

const addWatermark = async (imageBuffer, text = "PakEarth.com") => {
  try {
    const metadata = await sharp(imageBuffer).metadata();

    const width = metadata.width || 800;
    const height = metadata.height || 600;

    const fontSize = Math.floor(width * 0.08);
    const safeText = escapeXML(text);

    const svg = `
      <svg width="${width}" height="${height}">
        <text
          x="50%"
          y="50%"
          dominant-baseline="middle"
          text-anchor="middle"
          fill="white"
          font-size="${fontSize}"
          font-weight="bold"
          font-family="DejaVu Sans, sans-serif"
          opacity="0.35"
        >
          ${safeText}
        </text>
      </svg>
    `;

    const watermarkedImage = await sharp(imageBuffer)
      .composite([
        {
          input: Buffer.from(svg),
          top: 0,
          left: 0,
        },
      ])
      .webp({ quality: 90 })
      .toBuffer();

    return watermarkedImage;

  } catch (error) {
    console.error("Watermark Error:", error);
    throw error;
  }
};

export default addWatermark;
