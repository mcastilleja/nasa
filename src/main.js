const API_KEY = "RGMnpkN48HcdryavwwP25OxOZaNqzhT3bAwDv8Pq";
const URL_APOD = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=`;

// Obtiene el nombre del endpoint
let URLactual = window.location.pathname;

// Fecha actual para obtener ultimo día para cards
let today = new Date();
let actualD = parseInt(today.getDate());
let actualM = parseInt(today.getMonth() + 1);
let actualY = parseInt(today.getFullYear());

// Selectores principales
const select = document.getElementById("cards");
const section = document.getElementById("id");

// Obtener información del JSON
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

// Función para armado de videos Youtube
const youtube = (json) => {
  let img = document.createElement("iframe");
    img.setAttribute("src", json.url);
    img.setAttribute("title", json.title);
    img.setAttribute("frameborder", 0);
    img.setAttribute("allow", "autoplay; encrypted-media");
    return img
}

// Armado de sección Categorias
const html = (json) => {
  let a = document.createElement("a");
  a.setAttribute("id", json.date);
  a.setAttribute("href", `date=${json.date}`);

  let container = document.createElement("div");
  container.classList.add("container");

  let imgCont = document.createElement("div");
  imgCont.classList.add("img");

  if (json.media_type === "video") {
    let img = youtube(json)
    imgCont.appendChild(img);
  } else {
    let img = document.createElement("img");
    img.setAttribute("src", json.url);
    img.setAttribute("alt", json.title);
    imgCont.appendChild(img);
  }

  let title = document.createElement("div");
  title.classList.add("title");

  let h2 = document.createElement("h2");
  h2.innerHTML = json.title;

  title.appendChild(h2);

  container.append(imgCont, title);
  a.appendChild(container)

  select.append(a);
};

// Mostrar contenido en Categorias
const showData = async () => {
  for (let i = 2021; i <= actualY; i++) {
    for (let j = 9; j <= actualM; j++) {
      if (j === actualM) {
        for (let k = 1; k <= actualD; k++) {
          const finalData = await getData(`${URL_APOD}${i}-${j}-${k}`);
          if (finalData.code != 400) {
            html(finalData);
          }
        }
      } else {
        for (let k = 1; k <= 30; k++) {
          const finalData = await getData(`${URL_APOD}${i}-${j}-${k}`);
          if (finalData.code != 400) {
            html(finalData);
          }
        }
      }
    }
  }
};

// Armado de HTML para secciones delimitadas por fecha
const dateSection = (json) => {
  console.log(json)

  let divDesc = document.createElement("div");
  divDesc.classList.add("descripcion-inicio");

  let h1 = document.createElement("h1");
  h1.innerHTML = json.title;
  let p = document.createElement("p");
  p.innerHTML = json.explanation;

  divDesc.append(h1,p);

  let divImg = document.createElement("div");
  divImg.classList.add("img-inicio");

  if (json.media_type === "video") {
    let img = youtube(json)
    divImg.appendChild(img);
  } else {
    let img = document.createElement("img");
    img.setAttribute("src", json.hdurl);
    divImg.appendChild(img);
  }

  section.append(divDesc, divImg);

}


// Mostrar contenido interno de las cards
const setDate = async (date) => {
  const finalData = await getData(`${URL_APOD}${date}`)
  dateSection(finalData);
}


// Control de scripts por endpoints
if( URLactual === "/categoria"){ // Unicamente se muestra en /categoria

  showData();

} else if( URLactual.slice(0,6) === "/date=") { // Se muestra en todos los que tengan /date=

  let date = URLactual.slice(6);
  setDate(date);

} else if ( URLactual === "/") { // Unicamente en la raiz

  console.log("Bienvenido!!");

} 
