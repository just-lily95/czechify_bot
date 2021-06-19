<?php

$mysqli = new mysqli('origin.najemi.cz', 'czechify_bot', 'eitY8H1YWEskGTsW', 'czechify');

$data = [];

$query = $mysqli->query("SELECT * FROM `bot_thanks_translations`");
if (!($query)) die('QUERY FAILED!');
while ($row = $query->fetch_assoc()) {
    if (!(isset($data[$row['language']]))) $data[$row['language']] = [];
    $data[$row['language']][] = $row['translation'];
}

echo json_encode($data, 64|256);