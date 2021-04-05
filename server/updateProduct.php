<?php 
    //database connection 
    include "Database.php";

    $data = json_decode($_POST["x"] , false);

    header("HTTP/1/1 200 OK");

    $db = new Database();

 
    //update product passing the updated data  
    $db->updateProduct($data);

    ?>