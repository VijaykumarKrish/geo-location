
var map;
var marker;

// document.getElementById('startTrackingButton').addEventListener('click', startTracking);

// function startTracking() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(showPosition);
        map = L.map('map').setView([0, 0], 1);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 18
        }).addTo(map);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
// }

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var accuracy = position.coords.accuracy;

    // Display the location information on the web page
    document.getElementById('locationInfo').innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude + "<br>Accuracy: " + accuracy + " meters";
    postData({"latitude":latitude,"longitude":longitude})

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([latitude, longitude]).addTo(map);
    map.panTo(new L.LatLng(latitude, longitude));
}

 postData = async (data) =>{
    const response = await fetch("https://sse-ymct.onrender.com/data",{
    method:"POST",
    headers:{
        "content-Type":"application/json"
    },
    body: JSON.stringify(data),
})
console.log("response "+response)

}

