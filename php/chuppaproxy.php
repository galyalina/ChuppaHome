<?php

if (empty($_GET)) {
    echo file_get_contents('http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=1&outputFormat=application/json&srsname=EPSG:3857');
} else {

    $url = "http://fbinter.stadt-berlin.de/fb/wfs/geometry/senstadt/re_alkis_gebaeude?";
    $url = $url.'SERVICE='.$_GET['SERVICE'];


    echo $url.'
    ';


    $url .= '&VERSION='.$_GET['VERSION'];
    echo '

    '.$url.'
    ';


    $url .= '&REQUEST='.$_GET['REQUEST'];
    echo '

    '.$url.'
    \n';


    $url .= '&TYPENAME='.$_GET['TYPENAME'];
    echo '

    '.$url.'
    \n';


    $url .= '&MAXFEATURES='.$_GET['MAXFEATURES'];
    echo '

    '.$url.'
    ';


    $url .= '&outputFormat='.$_GET['outputFormat'];
    echo '

    '.$url.'
    ';


    $url .= '&srsname='.$_GET['srsname'];
    echo '

    '.$url.'
    ';

    $url .= '&bbox='.$_GET['bbox'];
    echo '

    '.$url.'
    ';


    echo '

    '.file_get_contents($url);
}
?>


<!--params=SERVICE=WFS&VERSION=1.0.0&REQUEST=getfeature&TYPENAME=fis:re_alkis_gebaeude&MAXFEATURES=10&outputFormat=application/json&srsname=EPSG:3857&bbox='-->
<!--+ extent.join(',') + ',EPSG:3857-->
