<?php

var data = await fetch('http://localhost/translate.php?fromLang=EN_GB&toLang=CS_CZ&text=' + encodeURI('You already have **all** the words!'));

if (!(isset($_GET['fromLang'])))
