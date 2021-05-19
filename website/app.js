/* Global Variables */

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();

// The personal API Key for OpenWeatherMap API is saved in a named const variable.
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=9ee55d8fdba07e8611a796cb5fabf49e&units=metric';

// Adds an event listener to an existing HTML button from DOM using Vanilla JS.
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zipCode =  document.getElementById('zip').value;
  const feelings =  document.getElementById('feelings').value;
// js chained promises
  getWeather(baseURL,zipCode,apiKey)
  // New Syntax!
  .then(
      (data)=>{
        // Add data
        console.log(data);
        postData('/addData',
        { temperature: data.list[0].main.temp,
        date: newDate,
        response: feelings } );
      }
  )
  .then(()=>updateUI()
  )
}

// asynchronous function to fetch the data from the app endpoint
const getWeather = async (baseURL, zip , key)=>{
  // The API Key variable is passed as a parameter to fetch() .
  const res = await fetch(baseURL+zip+key)
  try {
    // returning Data  from the external API.
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

//post data
const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

      try {
        const newData = await response.json();
               return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }

// Dynamically Update UI
  const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temperature+' celsius';
    document.getElementById('content').innerHTML = allData.response;

  }catch(error){
    console.log("error", error);
  }
}
