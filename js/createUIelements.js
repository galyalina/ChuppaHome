/**
 * Created by Galya on 28/03/2016.
 */
function addDistrictSelection() {
    $.getJSON("../res/berlin_districts_25833.geojson", function (json) {
        //var json = {
        //    "type": "FeatureCollection",
        //    "features": [{
        //        "type": "Feature",
        //        "properties": {
        //            "name": "Mitte",
        //            "cartodb_id": 1,
        //            "created_at": "2013-02-21T17:07:39.805Z",
        //            "updated_at": "2013-02-21T17:07:40.102Z"
        //        },
        //        "geometry": {
        //            "type": "MultiPolygon",
        //            "coordinates": '0'
        //        }
        //    },{
        //        "type": "Feature",
        //        "properties": {
        //            "name": "Lalalal",
        //            "cartodb_id": 1,
        //            "created_at": "2013-02-21T17:07:39.805Z",
        //            "updated_at": "2013-02-21T17:07:40.102Z"
        //        },
        //        "geometry": {
        //            "type": "MultiPolygon",
        //            "coordinates": '0'
        //        }
        //    }]
        //};

        // get reference to select element
        var sel = document.getElementById('district_selection');

        var result = [], type, features, properties, name;
        for (type in json) {
            for (features in json[type]) {
                for (properties in json[type][features]) {

                    for (item in json[type][features][properties]) {
                        if (item == 'name') {
                            //console.log('properties ' + json[type][features][properties][item]);
                            result.push(json[type][features][properties][item])  // this bit might need editing?
                            var opt = document.createElement('option');
                            opt.innerHTML = json[type][features][properties][item];
                            opt.value = json[type][features][properties][item];
                            sel.appendChild(opt);
                        }
                    }
                }
            }
        }
    });
}
