"use strict";

const express = require("express");
const app = express();
const path = require('path');
const home = "/../public/index.html"
const cat = "/../public/Categoria.html"
const section = "/../public/id.html"

const port = 8080;

// Rutas pagina
app.get("/", inicio);
app.get("/categoria", categoria);
app.get("/date=:id", explanation);

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

function explanation (req, res){
    res.sendFile(ruta(section));
}

// Marcador de rutas
function ruta ( url ){
    return path.resolve(`${__dirname}${url}`)
}