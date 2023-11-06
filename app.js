const express = require('express');
const path = require('path');
const fs = require('fs');
const youtubeDl = require('youtube-dl-exec');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/download', async (req, res) => {
  const videoUrl = req.body.videoUrl;
  const outputDir = req.body.outputDir;

  if (!videoUrl || !outputDir) {
    res.status(400).send('URL del video y carpeta de destino son obligatorios.');
    return;
  }

  try {
    await fs.promises.mkdir(outputDir, { recursive: true });

    const webmOptions = {
        o: path.join(outputDir, 'video-original-format'),
        format: 'best',
      };
      
      const webmOutput = await youtubeDl(videoUrl, webmOptions);
    console.log('Video descargado en formato original:', webmOutput);
    
    res.send('Descarga completada en el formato original.');
  } catch (error) {
    console.error('Error en la descarga de video:', error);
    res.status(500).send('Error en la descarga de video.');
  }
});

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
