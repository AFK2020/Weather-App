




const Form = document.querySelector(".weatherForm");
//console.log(Form);
const cityInput= document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="ef2c3f26fe52b454b3823dd41d4b4963";



Form.addEventListener("submit",async event =>{
    
    event.preventDefault();                      //forms have a default behaviour where they refresh so we are preventing that
    const city=cityInput.value;
    //console.log(cityInput.value);
    if(city){
        try{
            const data= await WeatherFetch(city);
            const dataJson= await data.json(); //to get data in proper format
            //console.log(dataJson);
            DisplayWeatherInfo(dataJson);
            
        }
        catch(error){
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
        }
});

async function WeatherFetch(city){
    const apiUrl= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);

        
        if(!apiUrl.ok){
                     throw new Error("Could not fetch weather data");
                 }

        else{
            return apiUrl;
        }


}

function DisplayWeatherInfo(data) //data will be in json format
{
    const {                     //destrcuturing
        name:city,
        main: {temp,feels_like,humidity},
        weather:  [{description,id}] } = data;


       //console.log("Weather Display is", city);


    const CityDisplay=document.createElement('h1');
    const Temperature= document.createElement('h2');
    const Feelslike=document.createElement('p');
    const Humidity=document.createElement('p');
    const Description= document.createElement('p');
    const weatherEmoji=document.createElement('p');


    card.textContent="";                        //Suppose there was some data on the card from previous search so we are reseting it to empty string
    card.style.display="flex";    



    CityDisplay.textContent=city;
    Temperature.textContent=`${(temp - 273.15).toFixed(1)}°C`;
    Feelslike.textContent=`Feels Like: ${(feels_like - 273.15).toFixed(1)}°C`;
    Humidity.textContent=`Humidity: ${humidity}%`;
    Description.textContent=description;
    weatherEmoji.textContent=getEmoji(id);


    //console.log(city);





    CityDisplay.classList.add("cityDisplay");
    Temperature.classList.add("temperature");
    Feelslike.classList.add("feels");
    Humidity.classList.add("humidity");
    Description.classList.add("descWeather");
    weatherEmoji.classList.add("weatherEmoji");

    
    card.appendChild(CityDisplay);
    card.appendChild(Temperature);
    card.appendChild(Feelslike);
    card.appendChild(Humidity);
    card.appendChild(Description);
    card.appendChild(weatherEmoji);




}

function getEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⚡⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "🌡";
    }


}

function displayError(message){

   const ErrorDisplay= document.createElement('p'); //create a paragragh element to display error
   ErrorDisplay.textContent=message;
    ErrorDisplay.classList.add("errorDisplay");     //addding css class froom style.css to style this error

    card.textContent="";                        //Suppose there was some data on the card from previous search so we are reseting it to empty string
    card.style.display="flex";                  //previously we set it to none when there is no data to display.
    card.appendChild(ErrorDisplay);             //We Create a <p> element and appended it to a <div> of class:"card"


}

//////////////////////////////////////////////////////////////////////////

// {
// const weatherForm = document.querySelector(".weatherForm");
// const cityInput = document.querySelector(".cityInput");
// const card = document.querySelector(".card");
// const apiKey = "YOUR API KEY";

// weatherForm.addEventListener("submit", async event => {

//     event.preventDefault();

//     const city = cityInput.value;

//     if(city){
//         try{
//             const weatherData = await getWeatherData(city);
//             displayWeatherInfo(weatherData);
//         }
//         catch(error){
//             console.error(error);
//             displayError(error);
//         }
//     }
//     else{
//         displayError("Please enter a city");
//     }
// });

// async function getWeatherData(city){

//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//     const response = await fetch(apiUrl);

//     if(!response.ok){
//         throw new Error("Could not fetch weather data");
//     }

//     return await response.json();
// }

// function displayWeatherInfo(data){

//     const {name: city, 
//            main: {temp, humidity}, 
//            weather: [{description, id}]} = data;

//     card.textContent = "";
//     card.style.display = "flex";

//     const cityDisplay = document.createElement("h1");
//     const tempDisplay = document.createElement("p");
//     const humidityDisplay = document.createElement("p");
//     const descDisplay = document.createElement("p");
//     const weatherEmoji = document.createElement("p");

//     cityDisplay.textContent = city;
//     tempDisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(1)}°F`;
//     humidityDisplay.textContent = `Humidity: ${humidity}%`;
//     descDisplay.textContent = description;
//     weatherEmoji.textContent = getWeatherEmoji(id);

//     cityDisplay.classList.add("cityDisplay");
//     tempDisplay.classList.add("tempDisplay");
//     humidityDisplay.classList.add("humidityDisplay");
//     descDisplay.classList.add("descDisplay");
//     weatherEmoji.classList.add("weatherEmoji");

//     card.appendChild(cityDisplay);
//     card.appendChild(tempDisplay);
//     card.appendChild(humidityDisplay);
//     card.appendChild(descDisplay);
//     card.appendChild(weatherEmoji);
// }

// function getWeatherEmoji(weatherId){

//     switch(true){
//         case (weatherId >= 200 && weatherId < 300):
//             return "";
//         case (weatherId >= 300 && weatherId < 400):
//             return "";
//         case (weatherId >= 500 && weatherId < 600):
//             return "";
//         case (weatherId >= 600 && weatherId < 700):
//             return "";
//         case (weatherId >= 700 && weatherId < 800):
//             return "";
//         case (weatherId === 800):
//             return "";
//         case (weatherId >= 801 && weatherId < 810):
//             return "";
//         default:
//             return "";
//     }
// }

// function displayError(message){

//     const errorDisplay = document.createElement("p");
//     errorDisplay.textContent = message;
//     errorDisplay.classList.add("errorDisplay");

//     card.textContent = "";
//     card.style.display = "flex";
//     card.appendChild(errorDisplay);
// }
// }