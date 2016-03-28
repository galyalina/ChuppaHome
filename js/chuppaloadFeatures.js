
function loadDistricts() {
     districts = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '../res/berlin_districts_25833.geojson',
            format: new ol.format.GeoJSON({
                defaultDataProjection: projection_25833
            })

        })
    });
    map.addLayer(districts);
}

function loadBuildings() {

    //buildingsLayer = new ol.layer.Vector({
    //    title: "Buildings",
    //    source: new ol.source.Vector({
    //        url: '../res/buildings_rent.geojson',
    //        projection: 'EPSG:4326',
    //        format: new ol.format.GeoJSON()
    //    }),
    //    style: new ol.style.Style({
    //        stroke: new ol.style.Stroke({
    //            color: 'blue',
    //            width: 2
    //        })
    //    })
    //});
    //
    //map.addLayer(buildingsLayer);


    //var vectorSource25833 = new ol.source.Vector({
    //    url: '../res/test_25833.geojson',
    //    format: new ol.format.GeoJSON({
    //        defaultDataProjection: projection_25833
    //    })
    //});
    //
    //var buildingsLayer25833 = new ol.layer.Vector({
    //    source: vectorSource25833,
    //    style: new ol.style.Style({
    //        stroke: new ol.style.Stroke({
    //            color: 'green',
    //            width: 2
    //        })
    //    })
    //});
    //
    //map.addLayer(buildingsLayer25833);


    var vectorSourceMitte25833 = new ol.source.Vector({
        url: '../res/districtMitte_updated.geojson',
        format: new ol.format.GeoJSON({
            defaultDataProjection: projection_25833
        })
    });
    var buildingsLayerMitte = new ol.layer.Vector({
        source: vectorSourceMitte25833,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 1
            })
        })
    });

    map.addLayer(buildingsLayerMitte);
}

function loadBuildingsByDistrict(fileName){
    console.log('loadBuildingsByDistrict');

    if(!isEmpty(buildingsLayer)){
        console.log('Remove');
        map.removeLayer(buildingsLayer);
    }

    var vectorSourceMitte25833 = new ol.source.Vector({
        url: fileName,
        format: new ol.format.GeoJSON({
            defaultDataProjection: projection_25833
        })
    });
    buildingsLayer = new ol.layer.Vector({
        source: vectorSourceMitte25833,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 1
            })
        })
    });

    map.addLayer(buildingsLayer);
}



function loadBuildingsLive(){

    vectorSource = new ol.source.Vector({
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

    buildingsLayer = new ol.layer.Vector({
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 45
            })
        })
    });

    map.addLayer(vector);
    //http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?service=wfs&version=1.1.0&outputFormat=application/json&request=GetFeature&typeName=fis:re_alkis_gebaeude&srsname=EPSG:25833&FILTER=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3EGebaeudefunktion_bezeichnung%3C/PropertyName%3E%3CLiteral%3EWohnhaus%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E

    //http://localhost:63342/CuppaHome/php/chuppaproxy.php?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=1000&outputFormat=application/json&srsname=EPSG:25833&bbox=400284.2382759188,5803824.444589877,1516510.6411778966,6878109.5532133,EPSG:25833
    //http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=1000&outputFormat=application/json&srsname=EPSG:25833&bbox=400284.2382759188,5803824.444589877,1516510.6411778966,6878109.5532133,EPSG:25833
}