//Google MAP
// this code is not used
function initMap() {
    return;
    var element2 = document.getElementById('mapPage');
    
    var option2 = {
        zoom: 14,
        center: {lat: 56.6925555, lng: 23.7930937},
        disableDefaultUI: true,
        zoomControl: true
    };
    //scaledSize: new google.maps.Size(100, 100);
    var myMapPage = new google.maps.Map(element2, option2);
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
        addMarker2(markers[i]);
    }
    function addMarker2(properties1) {
        var marker2 = new google.maps.Marker({
            position: properties1.coordinates,
            map: myMapPage,
            icon: properties1.image,
            content: properties1.info,
            title: properties1.title
        });  
        if(properties1.image) {
            marker2.setIcon(properties1.image);
        }
        if(properties1.info) {
            var InfoWindow2 = new google.maps.InfoWindow({
                content: properties1.info,
                maxWidth: 300
            });        
            marker2.addListener('click', function() {
                InfoWindow2.open(myMapPage, marker2);
            });                 
        }
    }
};