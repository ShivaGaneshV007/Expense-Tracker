const multer = require('multer');

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
<<<<<<< HEAD
        cb(null, `${Date.now()}-${file.originalname}`);
=======
       cb(null, `${Date.now()}-${file.originalname}`);
>>>>>>> 968ad80a28fbeed15db0b34d713dcd22ac0de8fc
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
<<<<<<< HEAD
=======


>>>>>>> 968ad80a28fbeed15db0b34d713dcd22ac0de8fc
