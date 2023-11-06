const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;
// const downloadController = require('./controllers/downloadController');
const downloadRoutes = require('./src/routes/downloadRoutes'); // Importa el módulo de rutas

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Usa las rutas definidas en el módulo downloadRoutes
app.use('/', downloadRoutes);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});


