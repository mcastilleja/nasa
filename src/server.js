"use strict";

const express = require("express");
const app = express();
const path = require('path');
const home = "/../public/index.html"
const cat = "/../public/Categoria.html"

const port = 8080;

// Rutas pagina
app.get("/", inicio);
app.get("/categoria", categoria);

// Carpetas en el proyecto
app.use(express.static('css'));
app.use(express.static('src'));
app.use(express.static('media'));

// Puerto del express
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// Funciones de las rutas
function inicio (req, res){
    res.sendFile(ruta(home));
}

function categoria (req, res){
    res.sendFile(ruta(cat));
}

// Marcador de rutas
function ruta ( url ){
    return path.resolve(`${__dirname}${url}`)
}