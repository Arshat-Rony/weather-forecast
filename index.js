let btn = document.querySelector("#search-btn")
let input = document.querySelector("#input")
let weatherStatus = document.querySelector(".weather-status")
let mainStatus = document.querySelector(".main-weather-status")
const API_KEY = `41b79585363b2745796e1a1d9e111d4a`


function urlGen(choice) {
    const searchurl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`

    const mainUrl = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`
    if (choice == false) {
        url = mainUrl;

    } else if (choice == true) {
        url = searchurl;

    }
    return url;
}
const loadData = async (choice) => {
    urlGen(choice)
    const res = await fetch(url)
    const data = await res.json()
    displayMainData(data.list)
}
loadData(false)
const loadSearchData = async (choice) => {
    urlGen(choice)
    const res = await fetch(url)
    const data = await res.json()
    displayData(data)
}

btn.addEventListener("click", () => {
    loadSearchData(true)
    input.value = ''
})


const displayData = (data) => {
    const Ownurl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    weatherStatus.innerHTML += `
   
    <div class="search-status text-white text-center py-4">
    <h2 id="heading" class="fw-bold text-center my-2">Your Favourite Country</h2>
  <img src="${Ownurl}" style="width=80px"; height ="80px";" alt="">
  <h1>${data.name}</h1>
  <h3><span>${data.main.temp}</span>&deg;C</h3>
  <h3 class="text-danger text-capitalize">${data.weather[0].description}</h3>
  </div>
  `
}


let number = 0;
const displayMainData = (data) => {
    setInterval(() => {
        if (number == 40) {
            number = 0;
        }
        const Picurl = `https://openweathermap.org/img/wn/${data[number].weather[0].icon}.png`

        mainStatus.innerHTML = `
           <div class="main-status text-white text-center">
               <img src="${Picurl}" style="width=80px"; height ="80px";" alt="">
               <h1>Country</h1>
               <h3><span>${data[number].main.temp}</span>&deg;C</h3>
               <h3 class="text-danger text-capitalize">${data[number].weather[0].description}</h3>
           </div>
     `
        number++
    }, 2000);
}