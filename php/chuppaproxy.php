<?php

if (empty($_GET)) {
    set_time_limit ( 300 );
    $result = file_get_contents('http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=100&outputFormat=application/json&srsname=EPSG:25833&bbox=400284.2382759188,5803824.444589877,1516510.6411778966,6878109.5532133,EPSG:25833');
    echo $result;
} else {
    $url = "http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?";
    if(!empty($_GET['SERVICE']))
        $url = $url.'SERVICE='.$_GET['SERVICE'];

    if(!empty($_GET['VERSION']))
        $url .= '&VERSION='.$_GET['VERSION'];
    if(!empty($_GET['REQUEST']))
        $url .= '&REQUEST='.$_GET['REQUEST'];
    if(!empty($_GET['TYPENAME']))
        $url .= '&TYPENAME='.$_GET['TYPENAME'];
    if(!empty($_GET['MAXFEATURES']))
        $url .= '&MAXFEATURES='.$_GET['MAXFEATURES'];
    if(!empty($_GET['outputFormat']))
        $url .= '&outputFormat='.$_GET['outputFormat'];
    if(!empty($_GET['srsname']))
        $url .= '&srsname='.$_GET['srsname'];

    if(!empty($_GET['bbox']))
        $url .= '&bbox='.$_GET['bbox'];
    set_time_limit ( 300 );
    echo file_get_contents($url);
}
?>
