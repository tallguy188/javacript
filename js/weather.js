
const weather= document.querySelector(".js-weather");
const API_KEYS = '61aedaf08bf810aa79f392209e08bf2b';
const COORDS = 'coords';

function getWeather(lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        console.log(json);
        weather.innerText = `${temperature} @ ${place}`;
    });
    // js에서 특정 url을 호출할때 사용하는 fetch
}


function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));

}



function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude ,
        longitude
        // 객체의 키와 값이 같을때는 이렇게 작성할 수 있다. 
        // 즉 원래는 latitude = latitude, longitude = longitude임
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);

}

function handleGeoError() {
    console.log('cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        // get weather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);

    }
    }



function init() {
    loadCoords();
}
init();