<?php
ini_set ('memory_limit', -1);
ini_set('max_execution_time', '-1'); //300 seconds = 5 minutes


if (empty($_GET)) {
    echo 'Empty get request';
    return;
} else {
    if (empty($_GET['file']) || empty($_GET['file_out'])) {
        echo 'Empty file name';
        return;
    } else {



        $in = $_GET['file'];
        $out = $_GET['file_out'];

        iconv("utf-8","ascii//TRANSLIT",$in);
        echo $in;


        if (!file_exists($in)) {
            echo 'file ' . $in . ' doesn\'t exist';
            return;
        }

        //ini_set('memory_limit', '-1');



        $output_file = $out;

        if (file_exists($output_file)) {
            echo 'file ' . $out . ' already exists';
            return;
        }

        $json_file = file_get_contents($in);

        //$json_file = file_get_contents('../res/district_mitte.geojson');//file_get_contents($_GET['file']);
        $json = json_decode($json_file, true);
        $unset_queue = array();
        // print_r($json[features]);
        $query1 = "2";
        $query2 = "3";

        foreach ($json['features'] as $i => $item) {
//            if ($item['properties']['Gebaeudefunktion_schluessel'] === "3034"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "3010"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2030"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "3011"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2310"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2465"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2143"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2020"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2071"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "2000"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "3037"
//                || $item['properties']['Gebaeudefunktion_schluessel'] === "3023")
//                //3041 3030 3032 2010 3016

            if(substr($item['properties']['Gebaeudefunktion_schluessel'], 0, strlen($query1)) === $query1 ||
                substr($item['properties']['Gebaeudefunktion_schluessel'], 0, strlen($query2)) === $query2 ||
                $item['properties']['Gebaeudefunktion_schluessel'] != '1010')
            {
                //echo 'Done';
                $unset_queue[] = $i;
            }
        }

        foreach ($unset_queue as $index) {
            unset($json['features'][$index]);
        }

        // rebase the array
        $json['features'] = array_values($json['features']);
        $new_json_string = json_encode($json);

        file_put_contents($output_file, $new_json_string);
        echo 'file ' . $output_file . ' created';
    }
}
?>
