const weddingDate = new Date("Dec 7, 2023 12:00:00 GMT+0200").getTime()
const symbol1 = "http://maps.google.com/mapfiles/kml/paddle/ltblu-circle.png";
const churchName = 'Parroquia San Fermín de los Navarros'
const celebrationName = 'Edificio ABC Serrano'
const ACCOUNT = 'ES57 0182 1294 1302 0065 7181'

const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = weddingDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days    = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("days").innerHTML  = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("mins").innerHTML  = minutes;
  document.getElementById("secs").innerHTML  = seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "LLEGAS TARDE 😒 \nPero aún puedes mandarnos un mensaje felicitándonos! 😘";
  }
}, 1000);


function initMap() {
  const churchLocations = {lat: 40.432624, lng: -3.692425}
  const celebrationLocations = {lat: 40.4323844, lng: -3.6871238}
  const center = meanPosition(churchLocations, celebrationLocations)
  var map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: onMobile? 17 : 15,
  });

  var pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";
  var labelOriginFilled =  new google.maps.Point(12,9);
  var markerImage1 = { 
    path: pinSVGFilled,
    anchor: new google.maps.Point(12,17),
    fillOpacity: 1,
    fillColor: "#8d65c5",
    strokeWeight: 2,
    strokeColor: "white",
    scale: 2,
    labelOrigin: labelOriginFilled
  };

  var markerImage2 = { 
    path: pinSVGFilled,
    anchor: new google.maps.Point(12,17),
    fillOpacity: 1,
    fillColor: "#8d65c5",
    strokeWeight: 2,
    strokeColor: "white",
    scale: 2,
    labelOrigin: labelOriginFilled
  };

  const markerChurch = new google.maps.Marker({
    map,
    position: churchLocations,
    title: churchName,
    label: {
      text: "✝️",
      fontSize: "18px",
    },
    icon: markerImage1
  });

  var markerCeleb = new google.maps.Marker({
    position: celebrationLocations,
    map: map,
    title: celebrationName,
    label: {
      text: "🥂",
      fontSize: "18px",
    },
    icon: markerImage2
  });
}

initMap();

function meanPosition(pos1, pos2) {
  var latitude = (pos1.lat + pos2.lat) /2 
  var longitude = (pos1.lng + pos2.lng) /2 
  return {lat: latitude, lng: longitude}
}


function unhide() {
  document.getElementById("account").classList = "";
}


const copyText = document.getElementById('account');

// Agrega un evento de clic al elemento <p>
copyText.addEventListener('click', () => {
  const textToCopy = ACCOUNT;
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy; // Establece el valor del textarea con el texto a copiar
  document.body.appendChild(textarea); // Agrega el textarea al DOM
  textarea.select(); // Selecciona el contenido del textarea
  document.execCommand('copy'); // Copia el contenido al portapapeles
  document.body.removeChild(textarea); // Elimina el textarea del DOM
});


// Oculta el indicador después de que se haya desplazado un poco
window.addEventListener('scroll', function() {
  var scrollIndicator = document.querySelector('.scroll-indicator');
  scrollIndicator.style.opacity = 0;
});
