<?php 
    //database connection 
    include "Database.php";

    

    header("HTTP/1/1 200 OK");

    $db = new Database();

 
    //add new product , passing the product data 
    $db->markJoborderAsComplete($_POST["x"]);

    ?>