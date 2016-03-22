/**
 * Created by Galya on 22/03/2016.
 */


function loadWMSlayer() {
    if (isEmpty(WMSLayer)) {
        WMSLayer = new ol.layer.Image({
            source: new ol.source.ImageWMS({
                url: 'http://fbinter.stadt-berlin.de/fb/wms/senstadt/lsa',
                params: {
                    'LAYERS': '1',
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