<?php

$mysqli = new mysqli('origin.najemi.cz', 'czechify_bot', 'eitY8H1YWEskGTsW', 'czechify');

$data = ['id2locale' => [], 'name2locale' => [], 'locale2language' => []];

$query = $mysqli->query("SELECT * FROM `servers`");
if ($query) while ($row = $query->fetch_assoc()) {
    $data['id2locale'][$row['id']] = $row['locale'];
    $data['name2locale'][$row['name']] = $row['locale'];
    $data['locale2language'][$row['locale']] = $row['language'];
}else die('QUERY FAILED!');

echo json_encode($data, 64|256);