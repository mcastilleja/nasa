"use strict";

const express = require("express");
const app = express();
const path = require('path');
const home = "/../public/index.html"

const port = 8080;

app.get("/", inicio);
app.use(express.static('css'));
app.use(express.static('src'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

function inicio (req, res){
    res.sendFile(ruta(home));
}

function ruta ( url ){
    return path.resolve(`${__dirname}${url}`)
}


/*const API_KEY = "RGMnpkN48HcdryavwwP25OxOZaNqzhT3bAwDv8Pq";
const URL_APOD = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const showData = async () => {
  const finalData = await getData(URL_APOD);
  console.log(finalData);
  return finalData;
};

showData();*/