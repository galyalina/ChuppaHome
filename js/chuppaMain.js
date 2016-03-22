proj4.defs("EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
var projection_25833 = ol.proj.get('EPSG:25833');
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    view: new ol.View({
        center: ol.proj.transform([13.4, 52.512181], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
    })
});

var WMSLayer;

function onloadFinished() {
    console.log('onloadFinished');
    localStorage.trafficlight_on = 0;
    loadWMSlayer();
    loadDistricts();
    loadBuildings();
}

//
//
//var select = null;  // ref to currently selected interaction
//var selectSingleClick = new ol.interaction.Select();
//var selectClick = new ol.interaction.Select({
//    condition: ol.events.condition.click
//});
//var selectElement = document.getElementById('type');
//
//var changeInteraction = function() {
//    if (select !== null) {
//        map.removeInteraction(select);
//    }
//    var value = selectElement.value;
//    if (value == 'singleclick') {
//        select = selectSingleClick;
//    } else if (value == 'click') {
//        select = selectClick;
//    } else if (value == 'mousemove') {
//        select = selectMouseMove;
//    } else {
//        select = null;
//    }
//    if (select !== null) {
//        map.addInteraction(select);
//    }
//};
//
//
///**
// * onchange callback on the select element.
// */
//selectElement.onchange = changeInteraction;
//changeInteraction();


$("#hw_trafficlight").click(function () {

    if (localStorage.trafficlight_on > 0) {
        localStorage.trafficlight_on = 0;
        map.removeLayer(WMSLayer);
    } else {
        localStorage.trafficlight_on = 1;
        loadWMSlayer();
        map.addLayer(WMSLayer);
    }
});

































