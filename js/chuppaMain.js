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
var districts;
var buildingsLayer;


function onloadFinished() {
    console.log('onloadFinished');
    addDistrictSelection();
    localStorage.trafficlight_on = 0;
    loadWMSlayer();
    loadDistricts();
}

var select = new ol.interaction.Select({
    condition: ol.events.condition.click
});

var changeInteraction = function () {
    console.log('changeInteraction');
    if (select !== null) {
        map.addInteraction(select);
        select.on('select', function (e) {
            //console.log('select');
            //var feature = map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
            //    return feature;
            //});

            var features = select.getFeatures();
            var feature = features.item(0);
            var id_district = feature.get('name');

            if (!isEmpty(id_district)) {
                id_district = id_district.replace(/\s+/g, '');

                console.log('District : ' + id_district);
                var coordinates = feature.getGeometry().getExtent();
                var box_coords1_25833 = ol.proj.transform([coordinates[0], coordinates[1]], 'EPSG:3857', 'EPSG:25833');
                var box_coords2_25833 = ol.proj.transform([coordinates[2], coordinates[3]], 'EPSG:3857', 'EPSG:25833');
                var district_url = 'SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&outputFormat=application/json&srsname=EPSG:25833&bbox='
                    + box_coords1_25833.join(',') + ',' + box_coords2_25833.join(',') + ',EPSG:25833';
                //console.log('District URL  : ' + district_url);


                //console.log('PHPrequest  : ' + "../php/districtsrequests.php?file=../res/district" + id_district + ".geojson" + "&" + district_url);

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
                //"Gebaeudefunktion_schluessel": "1010",
                var gebaeudefunktion_schluessel = feature.get('Gebaeudefunktion_schluessel');
                var gebaeudefunktion_bezeichnung = feature.get('Gebaeudefunktion_bezeichnung');

                console.log('Gebaeudefunktion_schluessel   : ' + gebaeudefunktion_schluessel + " Gebaeudefunktion_bezeichnung : " + gebaeudefunktion_bezeichnung);
            }


            //var box_coords1 = ol.proj.transform([coordinates[0],coordinates[1]], 'EPSG:3857', 'EPSG:4326');
            //var box_coords2 = ol.proj.transform([coordinates[2],coordinates[3]], 'EPSG:3857', 'EPSG:4326');
            //addRectangle(box_coords1, box_coords2);

            //document.getElementById('status').innerText = '&nbsp;' +
            //    e.target.getFeatures().getLength() +
            //    ' selected features (last operation selected ' + e.selected.length +
            //    ' and deselected ' + e.deselected.length + ' features)';


            //var box_coords1_25833 = ol.proj.transform([13.3914 , 52.5221], 'EPSG:4326', 'EPSG:25833');
            //var box_coords2_25833 = ol.proj.transform([13.4074 , 52.5155], 'EPSG:4326', 'EPSG:25833');
        });
    }
};


function addRectangle(box_coords1, box_coords2) {
    //console.log('Rtying to add '+box_coords1+" "+box_coords2);
    //map.addOverlay(new ol.Overlay({
    //    position: ol.proj.transform(
    //        box_coords1,
    //        'EPSG:4326',
    //        'EPSG:3857'
    //    ),
    //    element: $('<img src="//map.geo.admin.ch/1403704943/img/marker.png">')
    //}));
    //map.addOverlay(new ol.Overlay({
    //    position: ol.proj.transform(
    //        box_coords2,
    //        'EPSG:4326',
    //        'EPSG:3857'
    //    ),
    //    element: $('<img src="//map.geo.admin.ch/1403704943/img/marker.png">')
    //}));
}

changeInteraction();


//FILTERS
//<PropertyIsNotEqualTo><PropertyName>Gebaeudefunktion_schluessel</PropertyName><Literal>3034</Literal></PropertyIsNotEqualTo>
//http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&outputFormat=application/json&srsname=EPSG:25833&bbox=389083.4936827271,5818357.25403823,393482.20201455045,5822303.271794779,EPSG&Filter=<PropertyIsNotEqualTo><PropertyName>Gebaeudefunktion_schluessel</PropertyName><Literal>3034</Literal></PropertyIsNotEqualTo>
//$mitte_url = 'http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&outputFormat=application/json&srsname=EPSG:25833&bbox=389083.4936827271,5818357.25403823,393482.20201455045,5822303.271794779,EPSG';


//http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&outputFormat=application/json&srsname=EPSG:25833&bbox=389083.4936827271,5818357.25403823,393482.20201455045,5822303.271794779,EPSG&Filter=<PropertyIsNotEqualTo><PropertyName>Gebaeudefunktion_schluessel</PropertyName><Literal>3034</Literal></PropertyIsNotEqualTo>
