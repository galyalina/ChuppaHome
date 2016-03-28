$("#hw_trafficlight").click(function () {
    if (localStorage.trafficlight_on > 0) {
        localStorage.trafficlight_on = 0;
        console.log('Remove WMS');
        map.removeLayer(WMSLayer);
    } else {
        localStorage.trafficlight_on = 1;
        loadWMSlayer();
        console.log('Add WMS');
        map.addLayer(WMSLayer);
    }
});

$("#btnClose").click(function () {
    popupLayer.setPosition(undefined);
    btnClose.blur();
    return false;
});

$("#linkAddApartment").click(function () {
    popupLayer.setPosition(undefined);
    btnClose.blur();
    var top = document.getElementById('add_appartment').offsetTop; //Getting Y of target element
    window.scrollTo(0, top);
    return false;
});

$("#district_selection").on('change', function () {
    console.log('Selected district ' + this.value);
    selectDistrictFromFeatures(this.value);
});


function selectDistrictFromFeatures(nameDistrict) {

    var featureToBeSelected;
    var localFeatures = districtsLayer.getSource().getFeatures();
    for (var i = 0, l = localFeatures.length; i < l; i++) {
        //console.log(localFeatures[i].get('name'));
        if (localFeatures[i].get('name') === nameDistrict) {
            featureToBeSelected = localFeatures[i];
            break;
        }
    }

    if (!isEmpty(featureToBeSelected)) {

        var features = select.getFeatures();

        if (!isEmpty(selectedDistrictFeature)) {
            features.remove(selectedDistrictFeature);
            selectedDistrictFeature.setStyle(defaultStyle);
        }

        features.push(featureToBeSelected);
        selectedDistrictFeature = featureToBeSelected;
        selectedDistrictFeature.setStyle(selectedStyle);

        applayDistrictSelection(featureToBeSelected);
    }
}

$("#popupMsg").hide();
var popupEnabled = false;

$("#openPopup").click(function () {
    if (!popupEnabled) {
        $("#popupMsg").show();
        popupEnabled = true;
    } else {
        $("#popupMsg").hide();
        popupEnabled = false;
    }
});


map.on('click', function (e) {
    var layer = map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        return layer;
    });
    var feature = map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        return feature;
    });

    if (!isEmpty(DBbuildingsLayer)) {
        var buildingsFeatures = DBbuildingsLayer.getSource().getFeatures();
        if (buildingsFeatures.indexOf(feature) > -1) {
            var coordinate = e.coordinate;

            var gebaeudefunktion_schluessel = feature.get('Gebaeudefunktion_schluessel');
            var strassen_name = feature.get('Strassen_name');
            var hausnummer = feature.get('Hausnummer');


            var phone = feature.get('user_phone');
            var name = feature.get('user_name');
            var email = feature.get('user_email');
            var apartemntDetails = feature.get('apartment_description');

            var strContent = '';

            if (!isEmpty(strassen_name)) {
                strContent += 'Address:<br/>' + strassen_name;
            }
            if (!isEmpty(hausnummer)) {
                strContent += ' ' + hausnummer + '</p>';
            }

            strContent += 'Owner:<br/>' + name + ' , ' + phone + ',' + email + '</p>';
            strContent += 'Details:<br/> ' + apartemntDetails + '</p>';

            msgContent.innerHTML = strContent;
            popupLayer.setPosition(coordinate);
            selectedBuildingDBCandidate = null;
            $('#btnAddRemoveDiv').hide();


        } else {
            if (!isEmpty(buildingsLayer)) {
                var buildingsFeatures = buildingsLayer.getSource().getFeatures();
                if (buildingsFeatures.indexOf(feature) > -1) {
                    var coordinate = e.coordinate;

                    var gebaeudefunktion_schluessel = feature.get('Gebaeudefunktion_schluessel');
                    var strassen_name = feature.get('Strassen_name');
                    var hausnummer = feature.get('Hausnummer');

                    var strContent = '<p>Info: <br/>';
                    if (!isEmpty(gebaeudefunktion_schluessel)) {
                        strContent += 'Gebaeudefunktionschluessel ' + gebaeudefunktion_schluessel + '<br/>';
                    }
                    if (!isEmpty(strassen_name)) {
                        strContent += 'Address<br/>' + strassen_name;
                    }
                    if (!isEmpty(hausnummer)) {
                        strContent += ' ' + hausnummer + '</p>';
                    }

                    msgContent.innerHTML = strContent;
                    popupLayer.setPosition(coordinate);
                    selectedBuildingDBCandidate = feature;
                    $('#btnAddRemoveDiv').show();
                }
            }
        }
    }
});





