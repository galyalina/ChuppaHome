proj4.defs("EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
var projection_25833 = ol.proj.get('EPSG:25833');

var msgContainer = document.getElementById('msgBox');
var msgContent = document.getElementById('msgContent');

var popupLayer = new ol.Overlay(({
    element: msgContainer,
    autoPan: true
}));

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({source: new ol.source.OSM()})
    ],
    view: new ol.View({
        center: ol.proj.transform([13.4, 52.512181], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
    }),
    overlays: [popupLayer],
});



var districtsLayer;
var buildingsLayer;
var DBbuildingsLayer;

var select = new ol.interaction.Select({
    condition: ol.events.condition.click
});
var selectBuildings;
var selectedDistrictFeature;
var selectedBuildingDBCandidate;

var defaultStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'blue',
        width: 1
    })
});
var selectedStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'green',
        width: 3
    })
})


function onloadFinished() {
    console.log('onloadFinished');

    localStorage.wfs_trafficlight_on = 0;
    localStorage.wfs_green_on = 0;

    loadWMSlayer();
    loadWMSGreen();
    loadDistrictsWFSfile();

    selectBuildings = new ol.interaction.Select({
        layers: [buildingsLayer]
    });

    loadDBBuildings();
}


function applayDistrictSelection(feature){
    var id_district = feature.get('name');

    if (!isEmpty(id_district)) {
        console.log('applayDistrictSelection '+id_district);

        id_district = id_district.replace(/\s+/g, '');

        console.log('District : ' + id_district);
        var coordinates = feature.getGeometry().getExtent();
        var box_coords1_25833 = ol.proj.transform([coordinates[0], coordinates[1]], 'EPSG:3857', 'EPSG:25833');
        var box_coords2_25833 = ol.proj.transform([coordinates[2], coordinates[3]], 'EPSG:3857', 'EPSG:25833');
        var district_url = 'SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&outputFormat=application/json&srsname=EPSG:25833&bbox='
            + box_coords1_25833.join(',') + ',' + box_coords2_25833.join(',') + ',EPSG:25833';

        $.get("../php/districtsrequests.php?file=../res/district" + id_district + ".geojson" + "&" + district_url, (function (data) {
            console.log('PHP response : ' + data);

            console.log('Update district file  : ' + "../php/chuppajsonadapter.php?file=../res/district" + id_district + ".geojson&file_out=../res/district" + id_district + "_updated.geojson");

            $.get("../php/chuppajsonadapter.php?file=../res/districtMitte.geojson&file=../res/district" + id_district + ".geojson&file_out=../res/district" + id_district + "_updated.geojson", (function (data) {
                console.log('PHP response : ' + data);
                loadBuildingsByDistrict("../res/district" + id_district + "_updated.geojson");
                console.log('Building presented on map');
            }));


        }));
    }
    else {
        var gebaeudefunktion_schluessel = feature.get('Gebaeudefunktion_schluessel');
        var gebaeudefunktion_bezeichnung = feature.get('Gebaeudefunktion_bezeichnung');
        console.log('Gebaeudefunktion_schluessel   : ' + gebaeudefunktion_schluessel + " Gebaeudefunktion_bezeichnung : " + gebaeudefunktion_bezeichnung);
    }
}

$("#save_to_db_form").on('click', function () {
    writeBuildingToDB();
});



function writeBuildingToDB(){

    if(isEmpty(selectedBuildingDBCandidate)){
        alert("Please select building for rent");
        return false;
    }

    var name = document.forms["addApartmentForm"]["name"].value;
    if (name == null || name == "") {
        alert("Name must be filled out");
        return false;
    }

    var email = document.forms["addApartmentForm"]["email"].value;
    if (email == null || email == "") {
        alert("Email must be filled out");
        return false;
    }

    var phone = document.forms["addApartmentForm"]["phone"].value;
    if (phone == null || phone == "") {
        alert("Phone must be filled out");
        return false;
    }

    var description = document.forms["addApartmentForm"]["description"].value;

    selectedBuildingDBCandidate.set('user_name', name);
    selectedBuildingDBCandidate.set('user_email', email);
    selectedBuildingDBCandidate.set('user_phone', phone);
    selectedBuildingDBCandidate.set('apartment_description', description);

    writeFeatureToJson(selectedBuildingDBCandidate);

    return true;
}


function writeFeatureToJson(feature){
    var format = new ol.format.GeoJSON()
    var data;
    try {
        data = format.writeFeatures([feature]);
        console.log('data : ' + data);
        $.get("../php/writeFeature.php?data="+data, (function (data) {
            console.log('PHP response : ' + data);
            loadDBBuildings();
        }));
    } catch (e) {
        console.log('Error writing json');
    }
}
