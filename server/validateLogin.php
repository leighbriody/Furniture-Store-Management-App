<?php 
    //database connection 
    include "Database.php";

    $user = $_POST[$username];
    $pass = $_POST[$password];

    header("HTTP/1/1 200 OK");

    $db = new Database();

 
    //update product passing the updated data  
    $db->validateLogin ($user , $pass);

    ?>