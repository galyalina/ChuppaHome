/*
 Prologue by HTML5 UP
 html5up.net | @n33co
 Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
 */


proj4.defs("EPSG:25833", "+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
var projection_25833 = ol.proj.get('EPSG:25833');

(function ($) {

    skel.breakpoints({
        wide: '(min-width: 961px) and (max-width: 1880px)',
        normal: '(min-width: 961px) and (max-width: 1620px)',
        narrow: '(min-width: 961px) and (max-width: 1320px)',
        narrower: '(max-width: 960px)',
        mobile: '(max-width: 736px)'
    });

    $(function () {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function () {
            $body.removeClass('is-loading');
        });

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on mobile.
        skel.on('+mobile -mobile', function () {
            $.prioritize(
                '.important\\28 mobile\\29',
                skel.breakpoint('mobile').active
            );
        });

        // Scrolly links.
        $('.scrolly').scrolly();

        // Nav.
        var $nav_a = $('#nav a');

        // Scrolly-fy links.
        $nav_a
            .scrolly()
            .on('click', function (e) {

                var t = $(this),
                    href = t.attr('href');

                if (href[0] != '#')
                    return;

                e.preventDefault();

                // Clear active and lock scrollzer until scrolling has stopped
                $nav_a
                    .removeClass('active')
                    .addClass('scrollzer-locked');

                // Set this link to active
                t.addClass('active');

            });

        // Initialize scrollzer.
        var ids = [];

        $nav_a.each(function () {

            var href = $(this).attr('href');

            if (href[0] != '#')
                return;

            ids.push(href.substring(1));

        });

        $.scrollzer(ids, {pad: 200, lastHack: true});

        // Header (narrower + mobile).

        // Toggle.
        $(
            '<div id="headerToggle">' +
            '<a href="#header" class="toggle"></a>' +
            '</div>'
        )
            .appendTo($body);

        // Header.
        $('#header')
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'header-visible'
            });

        // Fix: Remove transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#headerToggle, #header, #main')
                .css('transition', 'none');

    });


    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({source: new ol.source.OSM()})
        ],
        view: new ol.View({
            center: ol.proj.transform([13.4, 52.512181], 'EPSG:4326', 'EPSG:3857'),
            zoom: 12
        })
    });

})(jQuery);


$(document).ready(function () {
    localStorage.trafficlight_on = 0;
    loadWMSlayer();
    loadJeoJson();
    loadBuilding();
});


function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

var map;
var WMSLayer;


function loadBuilding() {


    //var vectorSource25833online = new ol.source.Vector({
    //    format: new ol.format.GeoJSON({
    //        defaultDataProjection: projection_25833
    //    }),
    //    url: function (extent, resolution, projection) {
    //
    //        console.log(extent);
    //    },
    //    projection: 'EPSG:25833'
    //});
    ////
    //
    //var buildingsLayer25833 = new ol.layer.Vector({
    //    source: vectorSource25833online,
    //    style: new ol.style.Style({
    //        stroke: new ol.style.Stroke({
    //            color: 'green',
    //            width: 8
    //        })
    //    })
    //});
    //
    //map.addLayer(buildingsLayer25833);


    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON({
            defaultDataProjection: projection_25833
        }),
        url: function (extent, resolution, projection) {

            //console.log(extent.join(','));
            //var box_coords = ol.proj.transform(extent, 'EPSG:3857', projection_25833);
            //console.log(box_coords.join(','));
            //console.log('../php/chuppaproxy.php?params=SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=10&outputFormat=application/json&srsname=EPSG:25833&bbox='
            //    + box_coords.join(',') + ',EPSG:25833');
            return '../php/chuppaproxy.php?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=1000&outputFormat=application/json&srsname=EPSG:25833';
            //return '../php/chuppaproxy.php?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=10&outputFormat=application/json&srsname=EPSG:25833&bbox='
            //    + box_coords.join(',')+ ',EPSG:25833';
            //return '../php/chuppaproxy.php';
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

    //console.log(ol.proj.transform([1478597.875148449,6890339.477738928], 'EPSG:4326', projection_25833));
    //console.log(ol.proj.transform([1479820.8676010119,6891562.470191491], 'EPSG:4326', projection_25833));
    //console.log(extent.join(','));

}


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


function loadJeoJson() {

    var districts = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '../res/berlin_districts.geojson',
            format: new ol.format.GeoJSON({
                projection: 'EPSG:4326'
            })

        })
    });

    map.addLayer(districts);

    var buildingsLayer = new ol.layer.Vector({
        title: "Buildings",
        source: new ol.source.Vector({
            url: '../res/buildings_rent.geojson',
            projection: 'EPSG:4326',
            format: new ol.format.GeoJSON()
        }),
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
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

$("#hw_trafficlight").click(function () {

    if (localStorage.trafficlight_on > 0) {
        localStorage.trafficlight_on = 0;
        map.removeLayer(WMSLayer);
    } else {
        localStorage.trafficlight_on = 1;
        console.log("Try to load WMS");
        loadWMSlayer();
        map.addLayer(WMSLayer);
    }
});