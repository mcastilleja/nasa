"use strict";

const express = require("express");
const app = express();
const path = require('path');
const home = "/../public/index.html"

const port = 8080;

app.get("/", inicio);
app.use(express.static('css'));
app.use(express.static('src'));
app.use(express.static('media'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

function inicio (req, res){
    res.sendFile(ruta(home));
}

function ruta ( url ){
    return path.resolve(`${__dirname}${url}`)
}