const weddingDate = new Date("Dec 7, 2023 12:00:00 GMT+0200").getTime()
const churchName = 'Parroquia San Fermín de los Navarros'
const celebrationName = 'Edificio ABC Serrano'
const ACCOUNT = 'ES57 0182 1294 1302 0065 7181'
const churchLocations = {lat: 40.432624, lng: -3.692425};
const celebrationLocations = {lat: 40.4323844, lng: -3.6871238}
const center = meanPosition(churchLocations, celebrationLocations)

const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const iniPhone = /iPhone|iPod/.test(navigator.userAgent);

// Two free, key-less OpenStreetMap tile layers. "minimal" is a label-light
// basemap (CartoDB Positron) used by default; "detailed" is the standard OSM
// style that shows businesses and POIs — the equivalent of the old hide/show toggle.
const TILE_LAYERS = {
  minimal: {
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
  },
  detailed: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
};

//! Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = weddingDate - now;

  // Check if the countdown has finished
  var divMostrar = document.getElementById("timeOnGoing");
  var divOcultar = document.getElementById("timeOver");
  if (distance <= 0) {
    divMostrar.style.display = "none";   // Ocultar divMostrar
    divOcultar.style.display = "block";  // Mostrar divOcultar
    clearInterval(x);                    // Detener el contador
    return;
  }
  divOcultar.style.display = "none";     // Ocultar divOcultar

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

}, 1000);

//! Render the venue map with Leaflet + OpenStreetMap (no API key, no billing)
function initMap() {
  const map = L.map("map").setView([center.lat, center.lng], 17);

  let activeTiles = L.tileLayer(TILE_LAYERS.minimal.url, {
    attribution: TILE_LAYERS.minimal.attribution,
    maxZoom: TILE_LAYERS.minimal.maxZoom,
  }).addTo(map);

  // The hide/show radios swap the basemap (minimal vs. detailed) and zoom,
  // mirroring the old "minimize information / show all places" toggle.
  function applyLayer(key, zoom) {
    map.removeLayer(activeTiles);
    activeTiles = L.tileLayer(TILE_LAYERS[key].url, {
      attribution: TILE_LAYERS[key].attribution,
      maxZoom: TILE_LAYERS[key].maxZoom,
    }).addTo(map);
    map.setZoom(zoom);
  }

  document.getElementById("hide-poi").addEventListener("click", () => {
    applyLayer("minimal", 17);
  });
  document.getElementById("show-poi").addEventListener("click", () => {
    applyLayer("detailed", onMobile ? 17 : 15);
  });

  initMarkers(map);
}

initMap();

//! Markers on map
// Build a colored teardrop pin (same SVG path as the old Google markers) with
// an emoji centered on it, rendered as a Leaflet divIcon.
function makePin(color, emoji) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 24 30">' +
    '<path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" ' +
    'fill="' + color + '" stroke="white" stroke-width="1.2"/>' +
    '<text x="12" y="10.5" font-size="8" text-anchor="middle" dominant-baseline="central">' +
    emoji + '</text></svg>';
  return L.divIcon({
    html: svg,
    className: "", // drop Leaflet's default white box around divIcons
    iconSize: [40, 52],
    iconAnchor: [20, 50],
    tooltipAnchor: [0, -44],
  });
}

function initMarkers(map) {
  //* Marker church
  L.marker([churchLocations.lat, churchLocations.lng], {
    icon: makePin("#2e7dd6", "💒"),
    title: churchName,
  })
    .addTo(map)
    .bindTooltip(churchName);

  //* Marker celebration
  L.marker([celebrationLocations.lat, celebrationLocations.lng], {
    icon: makePin("#c64ea0", "🥂"),
    title: celebrationName,
  })
    .addTo(map)
    .bindTooltip(celebrationName);
}


function meanPosition(pos1, pos2) {
  var latitude = (pos1.lat + pos2.lat) /2 
  var longitude = (pos1.lng + pos2.lng) /2 
  return {lat: latitude, lng: longitude}
}

//! Logic for show account
function unhide() {
  document.getElementById("account").classList = "";
}

//! Render account number from the single source of truth
document.getElementById('accountNumber').textContent = ACCOUNT;

//! Copy account number to clipboard
const copyText = document.getElementById('account');
const messageContainer = document.getElementById('copyMessage');

copyText.addEventListener('click', () => {
  const textToCopy = ACCOUNT;
  const textarea = document.createElement('textarea');
  textarea.value = textToCopy; // Establece el valor del textarea con el texto a copiar
  document.body.appendChild(textarea); // Agrega el textarea al DOM
  textarea.select(); // Selecciona el contenido del textarea
  document.execCommand('copy'); // Copia el contenido al portapapeles
  document.body.removeChild(textarea); // Elimina el textarea del DOM
  
  messageContainer.style.display = 'flex'; // Muestra el contenedor del mensaje
  // Después de 2.5 segundos, oculta el mensaje
  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, 2500);
});

//! Hide arrow down on scrollling
window.addEventListener('scroll', function() {
  var scrollIndicator = document.querySelector('.scroll-indicator');
  scrollIndicator.style.opacity = 0;
});

//! Remove parallax effect on iPhone
if (iniPhone) {
  // Deshabilitar el efecto de paralaje
  document.querySelectorAll('.parallax').forEach(element => {
    element.style.backgroundAttachment = 'scroll';
  });
  // Reduicir altura de imagen2
  document.getElementById('section2').classList.add('height-minor');
}

