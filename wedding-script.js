const weddingDate = new Date("Dec 7, 2023 12:00:00 GMT+0200").getTime();


function miFuncion() {
  alert("¡Gracias por venir!");
}


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
  var map = new google.maps.Map(document.getElementById('map-church'), {
    zoom: 15,
    center: {lat: 40.4209193, lng: -3.6932415}
  });
  var marker = new google.maps.Marker({
    position: {lat: 40.4209193, lng: -3.6932415},
    map: map,
    title: 'Parroquia San Fermín de los Navarros'
  });
}

initMap();
