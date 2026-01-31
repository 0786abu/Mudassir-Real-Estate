import sharp from "sharp";

const addWatermark = async (imageBuffer) => {
  const image = sharp(imageBuffer);
  const meta = await image.metadata();

  if (!meta.width || !meta.height) {
    throw new Error("Invalid image");
  }

  const fontSize = Math.floor(meta.width * 0.08);

  return image
    .composite([
      {
        input: {
          text: {
            text: "PakEarth.com",
            font: `bold ${fontSize}px Sans`,
            rgba: true,
            color: "#ffffff",
            opacity: 0.35,
            align: "centre",
          },
        },
        gravity: "center",
      },
    ])
    .webp({ quality: 90 })
    .toBuffer();
};

export default addWatermark;
