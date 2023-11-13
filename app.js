const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const downloadRoutes = require('./src/routes/downloadRoutes');
const cors = require('cors')
app.use(express.urlencoded({ extended: true }));

// Configura Express para servir archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// Usa las rutas definidas en el módulo downloadRoutes
app.use('/', downloadRoutes);

// Ruta raíz que responde con "index.html" desde el directorio "public"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
