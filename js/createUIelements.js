/**
 * Created by Galya on 28/03/2016.
 */

function addDistrictToSelectionDiv() {
    $.getJSON("../res/berlin_districts_25833.geojson", function (json) {
        // get reference to select element
        var sel = document.getElementById('district_selection');

        var result = [], type, features, properties, name;
        for (type in json) {
            for (features in json[type]) {
                for (properties in json[type][features]) {

                    for (item in json[type][features][properties]) {
                        if (item == 'name') {
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

        console.log(result[0]);
        $("#district_selection option:first").attr('selected','selected');
        selectDistrictFromFeatures(result[0]);
    });
}
