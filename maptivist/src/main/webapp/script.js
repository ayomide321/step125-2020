// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** The global map variable is the initialized primary map for the webpage 
and should be used for any map parameters or variables */
var map;

/**
* Intializes the primary map for the main webpage
 */
function initMap(){
  var minneapolis = {lat: 44.9778, lng: -93.2650};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: minneapolis,
    mapId: '837a93b1537b2a61'
  });

  // Initializes the search box
  searchBox();
  
  // Example Marker
  var myLatlng = {lat: 44.8549, lng: -93.2422}

  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "Justice for George Floyd"
  });

  // Adds the new marker and infowindow to the map
  marker.setMap(map);
  var infowindow = new google.maps.InfoWindow({
    content: '<button>This works<button>'
  });
  
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

/**
* Adds an Auto complete search box to the main map
 */
function searchBox(){
  // Create the search box, info windows for results and link them to their UI elements
  var box = document.getElementById("search-container");
  var input = document.getElementById("search-input");
  var searchBox = new google.maps.places.SearchBox(input);
  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  // Add to the map
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(box);
  
  // Set the data fields to return when the user selects a place.
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
        }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  
    }
    
    // Concatentates a readable address for an autocomplete result
    var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        // Add the result contents to the infowindow display
        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map);
  }); 
}

/** Adds a new Marker based on form submission
 */

function createMarker() {
  // Get the coordinates from the form input and create a new Latlng object
  var latitude = parseFloat(document.getElementById('marker-lat').value);
  var longitude = parseFloat(document.getElementById('marker-lng').value);
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  
  // Create a new marker, it assumed that the position is a private attribute that cannot be accessed
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: document.getElementById('marker-title').value    
  });

  // Adds the new marker to the map and pans to the marker 
  marker.setMap(map);
  map.panTo(marker.getPosition());

  // Adds the new infowindow to the marker
  var infowindow = createInfowindow(marker.getPosition());
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

/**
* Adds an infowindow based on the marker creation form
 */
function createInfowindow(position) {
  //Set info window content from form
  var title = document.getElementById('marker-title').value;
  var location = position.toString();
  var description = document.getElementById('marker-description').value;
  var link = document.getElementById('marker-link').value;
  var category = document.getElementsByClassName('marker-category').value;
  
  // Set the content of the info window 
  var contentString = `<div id="marker-window"><h1>${title}</h1><br><h2>${location}</h2><br><p>${description}</p><br><p>${link}</p><br>`
  '<button>Upvote</button><br>' + '<button>Flag</button><br>' +
  '<h3>' + category + '</h3></div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  return infowindow;  
}

function openForm() {
  var form = document.getElementById("myFormPopup");
  form.style.display = "block";
}

function closeForm() {
  var form = document.getElementById("myFormPopup");
  form.style.display = "none";
}

window.onclick = function(event) {
  var form = document.getElementById("myFormPopup");

  if (event.target == form) {
    form.style.display = "none";
  }
}
