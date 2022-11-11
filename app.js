const form = document.querySelector(".form")
const input = document.querySelector(".form input")
const country = document.querySelector(".country")
const region = document.querySelector(".region")
const icon = document.querySelector(".icon")
const temp = document.querySelector(".temp span")
const desc = document.querySelector(".desc")
const time = document.querySelector(".time")
const daily = document.querySelector(".daily")

const API_URL = "https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=$namangan&days=7&aqi=yes&alerts=yes"

async function fetchAPI(api){
    const getData = await fetch(api)
    getData 
        .json()
        .then((res) => createWeather(res))
        .catch((err) => console.log(err))
}
fetchAPI(API_URL)

function createWeather(data){
    console.log(data);

    if(data.error){
        alert("Bunday manzil yoq")
        return;
    }

    country.innerHTML = data.location.country
    region.innerHTML = data.location.name
    temp.innerHTML = data.current.temp_c
    icon.src = data.current.condition.icon
    desc.innerHTML = data.current.condition.text
    time.innerHTML = data.location.localtime


    data.forecast.forecastday[1].hour.forEach((item)=> {
        const div = document.createElement("div")
        const time = document.createElement("p")

        div.className = "item"
        time.innerHTML = item.time.split(" ")[1]

        div.appendChild(time)
        daily.appendChild(div)
    })
}


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let value = input.value

    let changeApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=$${value}&days=7&aqi=yes&alerts=yes`
    
    fetchAPI(changeApiUrl)

    input.value = ""
})