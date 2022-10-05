const API_KEY = "RGMnpkN48HcdryavwwP25OxOZaNqzhT3bAwDv8Pq";
const URL_APOD = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=`;

let today = new Date();
let actualD = parseInt(today.getDate());
let actualM = parseInt(today.getMonth() + 1);
let actualY = parseInt(today.getFullYear());

const select = document.getElementById("cards");

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

const html = (json) => {
  let container = document.createElement("div");
  container.setAttribute("id", json.date);
  container.classList.add("container");

  let imgCont = document.createElement("div");
  imgCont.classList.add("img");

  if (json.media_type === "video") {

    let img = document.createElement("iframe");
    img.setAttribute("src", json.url);
    img.setAttribute("title", json.title);
    img.setAttribute("frameborder", 0);
    img.setAttribute("allow", "autoplay; encrypted-media");

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

  let description = document.createElement("div");
  description.classList.add("description");

  let p = document.createElement("p");
  p.innerHTML = json.explanation.substring(0, 210);

  description.appendChild(p);

  container.append(imgCont, title, description);

  select.append(container);
};

const showData = async () => {
  for (let i = 2022; i <= actualY; i++) {
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

  return finalData;
};

showData();
