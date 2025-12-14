import multer from "multer";

// Memory storage → file local disk pe save nahi hogi
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 40 * 1024 * 1024 } // 10MB
});

export default upload;
