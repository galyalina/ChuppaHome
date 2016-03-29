<?php
ini_set("default_charset", 'utf-8');

if (empty($_GET)) {
    echo 'empty get';
} else {
    if (empty($_GET['file'])){
        echo 'empty file name';
        return;
    }
    else {

        $updated = $_GET['updated'];

        if(file_exists($updated)){
            echo 'updated file '.$_GET['updated'].' already exists';
            return;
        }

        $in = $_GET['file'];
        //echo $in;

        if(file_exists($in)){
            echo 'file '.$in.' already exists';
            return;
        }

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

        echo $url;

        $filename = $in;

        $ch = curl_init();
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', '-1'); //300 seconds = 5 minutes
        curl_setopt($ch, CURLOPT_BUFFERSIZE, 8096);
        curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        $content = curl_exec($ch);
        curl_close($ch);
        $out = fopen($filename, 'w');
        if ($out) {
            fwrite($out, $content);
            fclose($out);
        }

        echo 'file '.$in.' created';
    }
}
?>
