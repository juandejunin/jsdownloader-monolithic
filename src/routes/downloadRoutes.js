// downloadRoutes.js
const express = require('express');
const path = require('path');

const router = express.Router();
const downloadController = require('../controller/downloadController');

// Ruta para la descarga
router.post('/download', async (req, res) => {
  const videoUrl = req.body.videoUrl;

  try {
    const cleanTitle = await downloadController.obtenerTituloLimpiado(videoUrl);
    const outputDir = downloadController.getDefaultDownloadDir();

    const fileName = await downloadController.descargarVideo(videoUrl, cleanTitle, outputDir);

    const downloadLink = `/download/${fileName}`;
    res.send(`Descarga completada. <a href="${downloadLink}">Descargar ${cleanTitle}</a>`);
  } catch (error) {
    res.status(500).send('Error en la descarga de video.');
  }
});

// Ruta para la descarga real
router.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(downloadController.getDefaultDownloadDir(), fileName);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Error al enviar el archivo:', err);
      res.status(500).send('Error al enviar el archivo.');
    }
  });
});

module.exports = router;
