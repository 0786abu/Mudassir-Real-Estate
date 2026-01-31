import sharp from "sharp";
import fs from "fs";
import path from "path";

const addWatermark = async (imageBuffer) => {
  const logoPath = path.resolve(
    process.cwd(),
    "public/assets/images/favicon-48-siz3.png"
  );

  const logoBuffer = fs.readFileSync(logoPath);

  // 🔹 Resize logo (recommended)
  const resizedLogo = await sharp(logoBuffer)
    .resize(180) // size control
    .png()
    .toBuffer();

  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  return image
    .composite([
      {
        input: resizedLogo,
        top: metadata.height - 180 - 40, // ⬅️ 40px upar
        left: metadata.width - 180 - 30, // ⬅️ right se thora gap
        opacity: 0.5
      }
    ])
    .jpeg({ quality: 90 })
    .toBuffer();
};

export default addWatermark;
