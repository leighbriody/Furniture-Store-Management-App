<?php 
require "database.php";
header("Content-type::application/json");
header("HTTP/1.1 200 OK");

$db = new Database();


$id = json_decode($_POST["x"] , false);



$outp = $db->getEstTimeToBuild($id);
echo implode( $outp);

?>