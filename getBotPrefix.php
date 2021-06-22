<?php

$mysqli = new mysqli('origin.najemi.cz', 'czechify_bot', 'eitY8H1YWEskGTsW', 'czechify');

$query = $mysqli->query("SELECT `_value` FROM `bot_settings` WHERE `_key` = 'prefix'");
if (!($query)) die('QUERY FAILED!'); else die($query->fetch_assoc()['_value']);
