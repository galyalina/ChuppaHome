/**
 * Created by Galya on 22/03/2016.
 */

var WMSLayerTraffic;
var WMSLayerGreen;


function loadWMSlayer() {
    if (isEmpty(WMSLayerTraffic)) {
        WMSLayerTraffic = new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://fbinter.stadt-berlin.de/fb/wms/senstadt/k06_06ewdichte2014',
                params: {
                    'LAYERS': '0',
                    'VERSION': '1.3.0',
                    'STYLES': 'gdi_default',
                    'CRS': 'EPSG:4326',
                    'FORMAT': 'image/png'
                },
                projection: 'EPSG:4326'
            })
        });
    }
}



//var projection_25833 = ol.proj.get('EPSG:25833');
function loadWMSGreen() {
    if (isEmpty(WMSLayerGreen)) {
        WMSLayerGreen = new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url:'http://fbinter.stadt-berlin.de/fb/wms/senstadt/radwege',
                params: {
                    'LAYERS': '0',
                    'VERSION': '1.3.0',
                    'CRS': 'EPSG:4326',
                    'STYLES': 'gdi_default',
                    'FORMAT': 'image/png'
                },
                projection: projection_25833
            })
        });
    }
}


$("#hw_trafficlight").click(function () {
    if (localStorage.wfs_trafficlight_on > 0) {
        localStorage.wfs_trafficlight_on = 0;
        console.log('Remove traffic WMS');
        map.removeLayer(WMSLayerTraffic);
    } else {
        localStorage.wfs_trafficlight_on = 1;
        loadWMSlayer();
        alert('Please be patient, WMS is very slow');
        map.addLayer(WMSLayerTraffic);
    }
});


$("#hw_green").click(function () {
    if (localStorage.wfs_green_on > 0) {
        localStorage.wfs_green_on = 0;
        console.log('Remove green WMS');
        map.removeLayer(WMSLayerGreen);
    } else {
        localStorage.wfs_green_on = 1;
        loadWMSGreen();
        alert('Please be patient, WMS is very slow');
        map.addLayer(WMSLayerGreen);
    }
});
