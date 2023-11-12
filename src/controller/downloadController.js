// downloadController.js
const path = require('path');
const fs = require('fs').promises;
const youtubeDl = require('youtube-dl-exec');
const os = require('os');
const axios = require('axios');

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

// Función para obtener el título limpiado
async function obtenerTituloLimpiado(videoUrl) {
  try {
    const response = await axios.get(videoUrl);
    const titleMatch = response.data.match(/<title>([^<]*)<\/title>/);

    if (titleMatch && titleMatch[1]) {
      const rawTitle = titleMatch[1];
      const cleanTitle = rawTitle.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').trim().toLowerCase();
      return cleanTitle;
    } else {
      throw new Error('No se pudo encontrar el título del video.');
    }
  } catch (error) {
    console.error('Error al obtener el título del video:', error);
    throw error;
  }
}

// Función para descargar el video
async function descargarVideo(videoUrl, cleanTitle, outputDir) {
  try {
    await fs.mkdir(outputDir, { recursive: true });

    const webmOptions = {
      o: path.join(outputDir, `${cleanTitle}.webm`),
      format: 'best',
    };

    const webmOutput = await youtubeDl(videoUrl, webmOptions);
    console.log('Video descargado en formato original:', webmOutput);

    return `${cleanTitle}.webm`;
  } catch (error) {
    console.error('Error en la descarga de video:', error);
    throw error;
  }
}

module.exports = {
  getDefaultDownloadDir,
  obtenerTituloLimpiado,
  descargarVideo,
};
