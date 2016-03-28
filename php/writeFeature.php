<?php
ini_set ('memory_limit', -1);
ini_set('max_execution_time', '-1'); //300 seconds = 5 minutes

$output_file = '../res/db.geojson';

if (empty($_GET)) {
    echo 'Empty get request';
    return;
} else {
    if (empty($_GET['data'])){
        echo 'Empty data';
        return;
    } else {

        $new_data = $_GET['data'];
        //iconv("utf-8","ascii//TRANSLIT", $new_data);

        //$new_data = htmlentities($new_data);
        //write as it's the first element
        if (!file_exists($output_file)) {
            file_put_contents($output_file, $new_data);
            echo 'file ' . $output_file . ' created';
            return;
        }

        $json_file = file_get_contents($output_file);
        $json = json_decode($json_file, true);
        $data_to_append = json_decode($new_data, true);
        $data_to_append = $data_to_append['features'][0];


        foreach ($json['features'] as $i => $item) {
            if($item['id'] == $data_to_append['id'])
            {
               echo $data_to_append['id'].' id already exists in file';
               return;
            }
        }


        array_push($json['features'], $data_to_append);
        $new_json_string = json_encode($json);


        preg_replace('/[^a-z]/i', '', iconv("UTF-8", "US-ASCII//TRANSLIT", $new_json_string));

        file_put_contents($output_file, $new_json_string);
        echo 'file ' . $output_file . ' updated';

        return preg_replace('/[^a-z]/i', '', iconv("UTF-8", "US-ASCII//TRANSLIT", $new_json_string));

    }
}
?>
