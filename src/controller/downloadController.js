const path = require('path');
const fs = require('fs');
const youtubeDl = require('youtube-dl-exec');
const os = require('os');



const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');



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

async function obtenerTituloLimpiado() {
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
    return null;
  }
}
const cleanTitle = await obtenerTituloLimpiado();
console.log(cleanTitle)
  try {
    // Utilizamos la carpeta de descargas predeterminada del sistema como destino.
    const outputDir = getDefaultDownloadDir();

    await fs.promises.mkdir(outputDir, { recursive: true });

    const webmOptions = {
      o: path.join(outputDir,cleanTitle),
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







// async function descargarAudio() {
//   const cleanTitle = await obtenerTituloLimpiado();

//   if (cleanTitle) {
//     try {
//       await fs.mkdir(outputDir, { recursive: true });

//       const webmOptions = {
//         o: path.join(outputDir, `${cleanTitle}.webm`),
//         format: 'bestaudio/best',
//       };

//       const webmOutput = await youtubeDl(url, webmOptions);
//       console.log('Audio webm descargado:', webmOutput);

//       const mp3Filename = path.join(outputDir, `${cleanTitle}.mp3`);

//       ffmpeg()
//         .input(path.join(outputDir, `${cleanTitle}.webm`))
//         .audioCodec('libmp3lame')
//         .audioBitrate(320)
//         .outputOptions('-map_metadata 0')
//         .toFormat('mp3')
//         .on('end', () => console.log('Conversión a MP3 exitosa.'))
//         .on('error', (err) => console.error('Error en la conversión a MP3:', err))
//         .save(mp3Filename);

//       return mp3Filename; // Puedes devolver información adicional si es necesario.
//     } catch (error) {
//       console.error('Error al descargar y convertir el audio a MP3:', error);
//       throw error; // Puedes relanzar el error si es necesario.
//     }
//   }
// }

// module.exports = {
//   downloadVideo: descargarAudio,
// };
