<?php 
include 'database.php';
$db = new Database();

if( $db->checkUserCredentials($_POST['username'] , $_POST['password']))
{

    
    //Get the user type
    $type = $db->getUserType($_POST['username'] , $_POST['password']);

    

    //if admin bring to admin home
    if(implode($type)  == "admin"){

        $_SESSION['username'] = $_POST['username'];
        $action = 'adminHome';
     
    }
    
    //if supervisor bring to supervisor home
    if(implode($type) == "supervisor"){

        $_SESSION['username'] = $_POST['username'];
        $action = 'supervisorHome';
        
    }
    

}
else 
{
    header("Location: controller.php?action=incorrectLogin");

    
    
}

?>