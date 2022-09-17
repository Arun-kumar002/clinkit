const API_KEY = "6b6c9a04f01f5faed253d1df71ee8a69";

let delivery = document.querySelector(".delivery")
let div = document.querySelector(".div2");
let btn = document.querySelector("#btn");
let popup = document.querySelector(".popup")

popup.style.display = 'flex'

div.addEventListener("change", (e) => {
    let value = e.target.value;
    getLocation(value);
});

async function getLocation(city) {
    let Base_Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    let data = await fetch(Base_Url);
    let res = await data.json();
    let userLocation = res.name;
    delivery.children[0].innerHTML = `${userLocation}`
    window.sessionStorage.setItem("Location", userLocation);
    popup.style.display = 'none'
    sessionStorage.clear()

}

// ----------- CurrentLocation code starts ---------------->
async function getCurrentLocation() {
    window.navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        let lat = coords.latitude;
        let long = coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
        let data = await fetch(url);
        let res = await data.json();
        let currLocation = res.name;
        delivery.children[0].innerHTML = `${currLocation}`
        window.sessionStorage.setItem("Location", JSON.stringify(currLocation));
        popup.style.display = 'none'
        sessionStorage.clear()
    });
}
btn.addEventListener("click", (e) => {
    getCurrentLocation();
});

// ----------- CurrentLocation code ends ---------------->
