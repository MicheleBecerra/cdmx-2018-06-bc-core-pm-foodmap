let map
let infowindow
let printConsult = ''
let dataInfoCafe = ''
let dataInfoRest = ''

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
      radius: 1200,
      types: ['restaurant']
    }
    let request1 = {
      location: myLatlng,
      radius: 1200,
      types: ['cafe']
    }
    // Creamos el servicio PlaceService y enviamos la petición.
    let service = new google.maps.places.PlacesService(map)

    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          crearMarcador(results[i])
          dataInfoRest = results
          console.log(dataInfoRest)
          PrintConsult(results[i])
        }
      }
    })
    service.nearbySearch(request1, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i])
          console.log('2' + results[i])
        }
      }
    })
  })
}
function crearMarcador (place) {
  // Creamos un marcador
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })

  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name)
    infowindow.open(map, this)
  })
}
PrintConsult = (results1) => {
  printConsult += `

<div class="card">

  <div class="card-body">
    <h5 class="card-title">${results1.name}</h5>
    <p class="card-text">
    Puntaje: ${results1.rating}
    </p>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Mas detalles ...
</button>
  </div>
</div>
<!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">${results1.name}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      Dirección: ${results1.vicinity},
      Puntaje: ${results1.rating}

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
    </div>
  </div>
</div>`
  infoRestaurantes.innerHTML = printConsult
}
