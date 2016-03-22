
function loadDistricts() {
    var districts = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '../res/berlin_districts.geojson',
            format: new ol.format.GeoJSON({
                projection: 'EPSG:4326'
            })

        })
    });
    map.addLayer(districts);
}

function loadBuildings() {

    var buildingsLayer = new ol.layer.Vector({
        title: "Buildings",
        source: new ol.source.Vector({
            url: '../res/buildings_rent.geojson',
            projection: 'EPSG:4326',
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
    });

    map.addLayer(buildingsLayer);


    var vectorSource25833 = new ol.source.Vector({
        url: '../res/test_25833.geojson',
        format: new ol.format.GeoJSON({
            defaultDataProjection: projection_25833
        })
    });

    var buildingsLayer25833 = new ol.layer.Vector({
        source: vectorSource25833,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 2
            })
        })
    });

    map.addLayer(buildingsLayer25833);
}


function loadBuildingsLive(){
    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON({
            defaultDataProjection: projection_25833
        }),
        url: function (extent, resolution, projection) {
            return '../php/chuppaproxy.php?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=10&outputFormat=application/json&srsname=EPSG:25833&bbox='
                + box_coords.join(',')+ ',EPSG:25833';
        },
        strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ({
            maxZoom: 19
        }))
    });

    var vector = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 45
            })
        })
    });

    map.addLayer(vector);
    //http://localhost:63342/CuppaHome/php/chuppaproxy.php?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=1000&outputFormat=application/json&srsname=EPSG:25833&bbox=400284.2382759188,5803824.444589877,1516510.6411778966,6878109.5532133,EPSG:25833
    //http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=1000&outputFormat=application/json&srsname=EPSG:25833&bbox=400284.2382759188,5803824.444589877,1516510.6411778966,6878109.5532133,EPSG:25833
}