import fs from 'fs';
import path from 'path';
import multer from 'multer';

const imagesDirectory = 'images/';

function createDirectory() {
  if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    createDirectory();
    callBack(null, imagesDirectory);
  },
  filename: (req, file, callBack) => {
    const originalName = path.basename(file.originalname, path.extname(file.originalname));
    const newFilename = `${originalName}-${Date.now()}${path.extname(file.originalname)}`;
    callBack(null, newFilename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callBack) => {
    const allowedFiletypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedFiletypes.test(file.mimetype);
    const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return callBack(null, true);
    }
    callBack(new Error('Error: File upload only supports the following filetypes - ' + allowedFiletypes));
  }
});

export async function uploadImages(req, res, next) {
  upload.array('images', 10)(req, res, async (err) => {    
    if (err) {
      return res.status(400).send(err.message);
    }

    req.imageFiles = req.files && req.files.length > 0 ? req.files : [];
    return next();
  });
};