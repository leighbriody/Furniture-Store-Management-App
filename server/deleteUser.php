<?php 
    //database connection 
    include "Database.php";

    $data = json_decode($_POST["x"] , false);

    header("HTTP/1/1 200 OK");

    $db = new Database();

 
    //add new product , passing the product data 
    $db->deleteUser($data);

    ?>