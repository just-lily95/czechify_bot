<?php

$mysqli = new mysqli('origin.najemi.cz', 'czechify_bot', 'eitY8H1YWEskGTsW', 'czechify');

$commands = [];

$query = $mysqli->query("SELECT * FROM `bot_commands`");
if ($query) while ($row = $query->fetch_assoc()) {
    $aliases = [];
    $name = $mysqli->escape_string($row['name']);
    $query1 = $mysqli->query("SELECT * FROM `bot_commands_aliases` WHERE `name` = '$name'");
    if ($query1) while ($row1 = $query1->fetch_assoc()) $aliases[$row1['locale']] = json_decode($row1['aliases'], 1); else die(json_encode(['error' => 'QUERY 2 FAILED!']));
    
    $commands[$row['name']] = ['filePath' => $row['filepath'], 'name' => $row['name'], 'description' => $row['description'], 'aliases' => $aliases, 'enabled' => $row['enabled'], 'admin' => $row['admin'], 'guild' => $row['guild'], 'dm' => $row['dm']];
}else die(json_encode(['error' => 'QUERY 1 FAILED!']));

echo json_encode($commands, 64|256);