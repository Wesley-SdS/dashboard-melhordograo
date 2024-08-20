import express from "express";
import cloudinary from "../config/cloudinaryConfig";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nome do arquivo
  }
});
const upload = multer({ storage });

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem foi enviada." });
    }

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer upload da imagem.", error });
  }
});

export default router;
