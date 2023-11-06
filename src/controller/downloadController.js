const path = require('path');
const fs = require('fs');
const youtubeDl = require('youtube-dl-exec');
const os = require('os');

// Función para obtener la carpeta de descargas predeterminada del sistema
function getDefaultDownloadDir() {
  const platform = os.platform();

  if (platform === 'win32') {
    return path.join(os.homedir(), 'Downloads');
  } else if (platform === 'darwin') {
    return path.join(os.homedir(), 'Downloads');
  } else {
    return path.join(os.homedir(), 'Descargas');
  }
}

// Controlador de descarga
const downloadVideo = async (req, res) => {
  const videoUrl = req.body.videoUrl;

  try {
    // Utilizamos la carpeta de descargas predeterminada del sistema como destino.
    const outputDir = getDefaultDownloadDir();

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
};

module.exports = {
  downloadVideo,
};
