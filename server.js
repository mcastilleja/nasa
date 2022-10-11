const express = require("express");
const app = express();
const PORT = 8000;

const ruta = `${__dirname}/public/`

// Rutas pagina
app.get("/", (req, res) => {
  res.sendFile( ruta + "index.html");
});
app.get("/categoria",(req, res) => {
  res.sendFile( ruta + "Categoria.html");
});
app.get("/date=:id", (req, res) => {
  res.sendFile( ruta + "id.html");
});

// Carpetas en el proyecto
app.use(express.static( ruta + "css"));
app.use(express.static( ruta + "src"));
app.use(express.static( ruta + "media"));

// Puerto del express
app.listen(PORT);
