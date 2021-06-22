<?php

if (!(isset($_GET['fromLang']))) die('NO FROM LANG'); else $langFrom = $_GET['fromLang'];
if (!(isset($_GET['toLang']))) die('NO TO LANG'); else $langTo = $_GET['toLang'];
if (!(isset($_GET['text']))) die('NO TEXT'); else $text = json_decode($_GET['text'], 1);
if (!($text)) die('TEXT INVALID');

$output = '';

$mysqli = new mysqli('origin.najemi.cz', 'czechify_bot', 'eitY8H1YWEskGTsW', 'czechify');

foreach ($text as $t) {
    $t = $mysqli->escape_string($t);
    $langTo = $mysqli->escape_string($langTo);
    $langFrom = $mysqli->escape_string($langFrom);
    $query = $mysqli->query("SELECT `word_target` FROM `bot_translate_data` WHERE `base_language` = '$langFrom' AND `target_language` = '$langTo' AND `word_base` = '$t'");
    if (!($query)) die('QUERY FAILED!');
    $found = '';
    while ($row = $query->fetch_assoc()) $found = $row['word_target'];
    if ($found) $output .= $found; else $output .= $t;
}
echo str_replace('\n', "\n", $output);