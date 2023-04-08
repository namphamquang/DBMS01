const express = require('express');
const multer = require('multer');

const router = express.Router();

const storageResume = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/resume/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/profile/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadResume = multer({ storage: storageResume });
const uploadProfile = multer({ storage: storageProfile });

router.post('/resume', uploadResume.single('file'), (req, res, next) => {
    const file = req.file;

    if (!file) {
        res.status(400).json({
            message: 'Not found',
        });
    } else if (file.mimetype !== 'application/pdf') {
        res.status(400).json({
            message: 'Invalid format',
        });
    } else {
        res.send({
            message: 'File uploaded successfully',
            url: `/host/resume/${file.filename}`,
        });
    }
});

router.post('/profile', uploadProfile.single('file'), (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: 'Not found',
        });
    }
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return res.status(400).json({
            message: 'Invalid format',
        });
    } else {
        return res.send({
            message: 'File uploaded successfully',
            url: `/host/profile/${file.filename}`,
        });
    }
});

module.exports = router;
