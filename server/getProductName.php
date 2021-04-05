<?php 
require "database.php";
header("Content-type::application/json");
header("HTTP/1.1 200 OK");

$db = new Database();

$outp = $db->getProductName($_POST["x"]);
echo implode($outp);

?>