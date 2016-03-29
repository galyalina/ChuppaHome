<?php
ini_set ('memory_limit', -1);
ini_set('max_execution_time', '-1'); //300 seconds = 5 minutes


if (empty($_GET)) {
    echo 'Empty get request';
    return;
} else {
    if (empty($_GET['file_out'])) {
        echo 'Empty out file name';
        return;
    } else {

        $out = $_GET['file_out'];
        if (file_exists($out)) {
            echo 'file ' . $out . ' already exists';
            return;
        }

        if (empty($_GET['file'])) {
            echo 'Empty file name';
            return;
        }


        $in = $_GET['file'];
        iconv("utf-8","ascii//TRANSLIT",$in);

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
        $json = json_decode($json_file, true);
        $unset_queue = array();
        // print_r($json[features]);
        $query1 = "2";
        $query2 = "3";

        foreach ($json['features'] as $i => $item) {
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
