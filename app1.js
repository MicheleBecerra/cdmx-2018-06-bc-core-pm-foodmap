let map
let infowindow

function initMap () {
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude

    var myLatlng = new google.maps.LatLng(lat, lon)

    var mapOptions = {
      center: myLatlng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.MAPA
    }

    map = new google.maps.Map(document.getElementById('mapa'), mapOptions)

    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow()
    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    let request = {
      location: myLatlng,
      radius: 2500,
      types: ['restaurant']   
    }
    let request1 = {
      location: myLatlng,
      radius: 2500,
      types: ['cafe']
    }
    // Creamos el servicio PlaceService y enviamos la petición.
    let service = new google.maps.places.PlacesService(map)

    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
        }
      }
    })
    service.nearbySearch(request1, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
        }
      }
    })

  })
}
function crearMarcador (place) {
  // Creamos un marcador
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })

  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name) 
    infowindow.open(map, this)
  })
}
