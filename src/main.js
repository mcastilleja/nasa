const API_KEY = "RGMnpkN48HcdryavwwP25OxOZaNqzhT3bAwDv8Pq";
const URL_APOD = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=`;
const URL_APOD_DATE = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=`;

// Fecha actual para obtener ultimo día para cards
let today = new Date();
let actualD = parseInt(today.getDate());
let actualM = parseInt(today.getMonth() + 1);
let actualY = parseInt(today.getFullYear());

// Obtiene el nombre del endpoint
let URLactual = window.location.pathname;

// Selectores principales
const select = document.getElementById("cards");
const section = document.getElementById("id");

let numberCards = 15;
let ultimaCard;

// Observador
let observador = new IntersectionObserver( ( entradas, observador ) => {
  entradas.forEach(entradas => {
    if(entradas.isIntersecting){
      numberCards = 0
      numberCards += 15;
      showData(numberCards)
    }
  })
}, {
  rootMargin: '0px 0px 0px 0px',
  threshold: 1.0
});


// Obtener información del JSON
const getData = async (url) => {
  try {

    const response = await fetch(url);
    const data = await response.json();
    return data;
    
  } catch (error) {

    console.log(error);

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
const showData = async ( count/*, year*/ ) => {
        /*if(year != actualY ){*/
          const finalData = await getData(`${URL_APOD}${count}`);//&start_date=${year}-01-01&end_date=${year}-12-31`);
          for(let i = 0; i < count; i++){
            if( finalData[i].url != undefined ){
              html(finalData[i]);
            }
          }
        /*} else {
          const finalData = await getData(`${URL_APOD}${count}`);//&start_date=${year}-01-01&end_date=${year}-${actualM}-${actualD}`);
          for(let i = 0; i < count; i++){
            if( finalData[i].url != undefined ){
              html(finalData[i]);
            }
          }
        }*/
          
        if(ultimaCard){
          observador.unobserve(ultimaCard);
        }

        const cardScreen = document.querySelectorAll('#cards .container');
        ultimaCard = cardScreen[cardScreen.length - 14]; // Cambiar ultimo visible
        observador.observe(ultimaCard)
};

// Armado de HTML para secciones delimitadas por fecha
const dateSection = (json) => {

  let divDesc = document.createElement("div");
  divDesc.classList.add("descripcion-inicio");

  let h1 = document.createElement("h1");
  h1.innerHTML = json.title;
  let p = document.createElement("p");
  p.innerHTML = json.explanation;

  let date = document.createElement("div");
  date.classList.add("fechaFoto");
  date.innerHTML = json.date;

  divDesc.append(h1, p, date);

  let divImg = document.createElement("div");
  divImg.classList.add("img-inicio");

  
  let copyR = document.createElement("div");
  copyR.classList.add("copyright");
  if ( json.copyright != undefined ){
    copyR.innerHTML = `©CopyRight ${json.copyright}`;
  } else {
    copyR.innerHTML = '';
  }
  

  if (json.media_type === "video") {
    let img = youtube(json)
    divImg.append(img, copyR);
  } else {
    let img = document.createElement("img");
    img.setAttribute("src", json.hdurl);
    divImg.append(img, copyR);
  }

  section.append(divDesc, divImg);

}


// Mostrar contenido interno de las cards
const setDate = async (date) => {
  const finalData = await getData(`${URL_APOD_DATE}${date}`)
  dateSection(finalData);
}


// Años random para carga
function generateRandomInt(min,max){
  return Math.floor((Math.random() * (max-min)) +min);
}

// Control de scripts por endpoints
if( URLactual === "/categoria"){ // Unicamente se muestra en /categoria

  /*let numberRandom = generateRandomInt(1995,actualY+1);

  if ( sessionStorage.getItem("proyect") === null){
    sessionStorage.setItem("year", numberRandom);
  }
  
  sessionStorage.setItem("proyect", "nasa");

  let sessionYear =  sessionStorage.getItem("year");*/

  showData(numberCards);//, sessionYear);

} else if( URLactual.slice(0,6) === "/date=") { // Se muestra en todos los que tengan /date=

  let date = URLactual.slice(6);
  setDate(date);

} else if ( URLactual === "/") { // Unicamente en la raiz

  console.log("Bienvenido!!");

}

window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});