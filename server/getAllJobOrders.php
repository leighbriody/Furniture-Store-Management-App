<?php
require "Database.php";
header("Content-type::application/json");
header("HTTP/1.1 200 OK");

$db = new Database();

$outp = $db->getAllJobOrders();
echo json_encode($outp);

?>