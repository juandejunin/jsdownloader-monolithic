const express = require('express');
const path = require('path');
const fs = require('fs');
const youtubeDl = require('youtube-dl-exec');

const os = require('os');
const platform = os.platform();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));




let defaultDownloadDir;

if (platform === 'win32') {
  // En Windows, la carpeta de descargas suele estar en la carpeta de usuario.
  defaultDownloadDir = path.join(os.homedir(), 'Downloads');
} else if (platform === 'darwin') {
  // En macOS, la carpeta de descargas suele estar en la carpeta de usuario.
  defaultDownloadDir = path.join(os.homedir(), 'Downloads');
} else {
  // En sistemas basados en Linux, la carpeta de descargas puede variar según la distribución.
  // Puedes intentar utilizar ~/Descargas, que es común en muchas distribuciones.
  defaultDownloadDir = path.join(os.homedir(), 'Descargas');
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.videoUrl;
//   const outputDir = req.body.outputDir;

//   if (!videoUrl || !outputDir) {
//     res.status(400).send('URL del video y carpeta de destino son obligatorios.');
//     return;
//   }

//   try {
//     await fs.promises.mkdir(outputDir, { recursive: true });

//     const webmOptions = {
//         o: path.join(outputDir, 'video-original-format'),
//         format: 'best',
//       };
      
//       const webmOutput = await youtubeDl(videoUrl, webmOptions);
//     console.log('Video descargado en formato original:', webmOutput);
    
//     res.send('Descarga completada en el formato original.');
//   } catch (error) {
//     console.error('Error en la descarga de video:', error);
//     res.status(500).send('Error en la descarga de video.');
//   }
// });

app.post('/download', async (req, res) => {
  const videoUrl = req.body.videoUrl;

  try {
    // Utilizamos la carpeta de descargas predeterminada del sistema como destino.
    const outputDir = defaultDownloadDir;

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
