const express = require('express');
const downloadController = require('../controller/downloadController');

const router = express.Router();

// Define la ruta de descarga y utiliza el controlador correspondiente
router.post('/download', downloadController.downloadVideo);

module.exports = router;
