import multer from "multer";

export const upload = () => multer({ dest: ".cache/uploads/" }).single("file");
