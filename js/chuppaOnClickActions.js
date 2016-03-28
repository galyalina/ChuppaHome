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


$("#district_selection").on('change', function() {
    console.log(''+this.value);
});