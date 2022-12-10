// Initialize and add the map
let startingLocation = {lat: 45.4642, lng: 9.1900};
let markers = [];

function initMap() {
    var currLocation = { lat: 48, lng: 0 };
    // The map, centered in Western Europe
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: currLocation,
      mapTypeId: 'terrain',
      disableDefaultUI: true,
      zoomControl: true
    });

    // Limit zooming & establish border for scrolling 
    var opt = { minZoom: 5, maxZoom: 9 };
    map.setOptions(opt);
    addBound(map);

    map.setOptions({ styles: styles["hideAll"] });


    // if no marker on the map, click to add a marker
    map.addListener('click', function(e) {
      if (markers.length < 1) {
        placeMarkerAndPanTo(e.latLng, map);
      }
    });
}


function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
  markers[i].setMap(map);
  console.log('set marker ' + i);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

// Adding a marker
function placeMarkerAndPanTo(latLng, map) {

  var newMarker = new google.maps.Marker({
    position: latLng,
    map: map,
  });
  markers.push(newMarker);
  map.panTo(latLng);
  console.log(markers);
  showConfirmationPanel();
  setMapOnAll(map);
}

function showConfirmationPanel() {
  const panel = document.querySelector('.confirmation_panel');
  panel.style.display = "block";
}

function hideConfirmationPanel() {
  const panel = document.querySelector('.confirmation_panel');
  panel.style.display = "none";
}
  
// Setting up appropriate map style for the game
const styles = {
    default: [],
    hideAll: [
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "landscape",
        elementType: "all",
        stylers: [
          { saturation: -95 },
          { lightness: 20 },
          { gamma: 0.5 }
        ]
      },{
        featureType: "landscape",
        elementType: "labels",
        stylers: [
          { visibility: "off" },
        ]
      },{
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "road",
        elementType: "all",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "transit",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "water",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "water",
        elementType: "all",
        stylers: [
          { saturation: -100 },
          { lightness: 120 },
          { gamma: 0.5 }
        ]
      }
    ]
  };


function addBound(map) {
    // Bounds for West Europe
    var strictBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(40, -5), 
      new google.maps.LatLng(65, 15)
    );

    // Listen for the dragend event
    google.maps.event.addListener(map, 'dragend', function() {
      if (strictBounds.contains(map.getCenter())) return;

      // We're out of bounds - Move the map back within the bounds

      var c = map.getCenter(),
          x = c.lng(),
          y = c.lat(),
          maxX = strictBounds.getNorthEast().lng(),
          maxY = strictBounds.getNorthEast().lat(),
          minX = strictBounds.getSouthWest().lng(),
          minY = strictBounds.getSouthWest().lat();

      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;

      map.setCenter(new google.maps.LatLng(y, x));
    });
  }

  window.initMap = initMap;