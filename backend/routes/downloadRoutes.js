const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/resume/:file', (req, res) => {
    const file = req.params.file;
    const fileLocation = path.join('public/resume', file);
    res.download(fileLocation, file);
});

router.get('/profile/:file', (req, res) => {
    const file = req.params.file;
    const fileLocation = path.join('public/profile', file);
    res.download(fileLocation, file);
});

module.exports = router;
