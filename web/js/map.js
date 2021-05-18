//Google MAP

function initMap() {
    var element = document.getElementById('map');
    var option = {
        zoom: 15,
        center: {lat: 56.6878066, lng: 23.7929113},
        disableDefaultUI: true,
        zoomControl: true
    };    
    var markerSize = { scaledSize: new google.maps.Size(100, 100)};
    var myMap = new google.maps.Map(element, option);  
    var markers = [
        {
            coordinates: {lat: 56.6878066, lng: 23.7929113},
            image: '/web/img/map-marker-blue.png',
            title: 'Маркер 1',
            info: '<div id="contentMap">' +
            '<h3>A/S „Mārupes Metālmeistars” Ozolnieki, Kopiela 1b, LV-3018</h3>' +
            '<div id="bodyContentMap">' +
            '<p>Tel: +371 63050650</p>' +
            '<p>Fakss: + 371 63094237</p>' +
            '</div>' +
            '</div>'
        }, 
        {
            coordinates: {lat: 56.6934846, lng: 23.791056},
            image: '/web/img/map-marker-red.png',
            title: 'Маркер 2',
            info: '<div id="contentMap">' +
            '<h3>A/S „Mārupes Metālmeistars” Stadiona iela 1, Ozolnieki, Ozolnieku novads, LV – 3018</h3>' +
            '<div id="bodyContentMap">' +
            '<p>Tel: +371 67069867</p>' +
            '<p>Fakss: +371 67069868</p>' +
            '</div>'+
            '</div>'
        }        
    ];
    for(var i = 0; i < markers.length; i++)
    {
        addMarker(markers[i]);
    }
    function addMarker(properties) {
        var marker = new google.maps.Marker({
            position: properties.coordinates,
            map: myMap,
            icon: properties.image,
            content: properties.info,
            title: properties.title
        });  
        if(properties.image) {
            marker.setIcon(properties.image);
            scaledSize: new google.maps.Size(100, 100);
        }
        if(properties.info) {
            var InfoWindow = new google.maps.InfoWindow({
                content: properties.info,
                maxWidth: 300
            });        
            InfoWindow.open(myMap, marker);
            marker.addListener('click', function() {
                InfoWindow.open(myMap, marker);
            });                 
        }
    }

};
