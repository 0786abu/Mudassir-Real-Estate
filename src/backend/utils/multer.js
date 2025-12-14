import multer from "multer";

// Memory storage → file local disk pe save nahi hogi
const storage = multer.memoryStorage();

const upload = multer({ 
  storage
});

export default upload;
