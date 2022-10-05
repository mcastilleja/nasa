const API_KEY = "RGMnpkN48HcdryavwwP25OxOZaNqzhT3bAwDv8Pq";
const URL_APOD = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=`;

let today = new Date();
let actualD = parseInt(today.getDate());
let actualM = parseInt(today.getMonth() + 1); 
let actualY = parseInt(today.getFullYear());


const getData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if( data.code != 400 ){
        return data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
};

const showData = async () => {

    for(let i = 1996; i <= actualY; i++){
        for(let j = 1; j <= 12; j++) {
            for(let k = 1; k <= 30; k++ ){

                const finalData = await getData(`${URL_APOD}${i}-${j}-${k}`);
    
                console.log(finalData);

            }
        }
    }
    return finalData;

};

showData();