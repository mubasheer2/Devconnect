import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;