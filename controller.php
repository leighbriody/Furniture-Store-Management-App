<?php
session_start();
$action = filter_input(INPUT_POST, 'action');
if($action == null){
    $action = filter_input(INPUT_GET,'action');
}

try {

   
    
    //if no session in place then check for valid actions for outside session]

    if(!isset($_SESSION['username'])){

        

        //actions outside a session
        switch($action){
            case null:
                
                readfile('./client/header.html');
                readfile('./client/login.html');
                readfile('./client/footer.html');
            break;
            case 'auth':
                include './server/authorise.php';               

                            
           break;
           case 'incorrectLogin':
            
           readfile('./client/incorrectLogin.html');

        break;
            
        }
    }

    if(isset($_SESSION['username'])){

        switch($action){
            //TOSO - add in session actions
            case 'adminHome':
                
                readfile('./client/header.html');
                readfile('./client/adminMenu.html');
                readfile('./client/adminHome.html');
                readfile('./client/footer.html');
            break;
            case  'addProduct':
                readfile('./client/header.html');
                readfile('./client/adminMenu.html');
                readfile('./client/products.html');
                readfile('./client/footer.html');
            break;
            case 'addNewProduct':
                include './server/newProduct.php';
            break;
            case 'getAllProducts':
                include './server/getAllProduct.php';
            break;
            case 'employeePage' :
                readfile('./client/header.html');
                readfile('./client/adminMenu.html');
                readfile('./client/employees.html');
                
                readfile('./client/footer.html');
            break;
            case 'getAllEmployee' :
                include './server/getAllEmployee.php';
            break;
            case 'addEmployee':
                include './server/addNewEmployee.php';
            break;
            case 'deleteEmployee':
                include './server/deleteEmployee.php';
            break;
            case 'deleteProduct':
                include './server/deleteProduct.php';
            break;
            case 'updateEmployee':
                include './server/updateEmployee.php';
            break;
            case'updateProduct':
                include './server/updateProduct.php';
            break;
            case 'usersPage':
                readfile('./client/header.html');
                readfile('./client/adminMenu.html');
                readfile('./client/users.html');
                readfile('./client/footer.html');
            break;
            case 'getAllUsers' :
                include './server/getAllUsers.php';
            break;
            case 'deleteUser' :
                include './server/deleteUser.php';
            break;
            case 'getAllUserTypes':
                include './server/getAllUserTypes.php';
            break;
            case 'addNewUser':
                include './server/addNewUser.php';
            break;
            case 'enterOrderDetails':
                readfile('./client/header.html');
                readfile('./client/adminMenu.html');
                readfile('./client/enterOrderDetails.html');
                readfile('./client/footer.html');
            break;
            case 'getNextOrderNumber':
                include './server/getNextOrderNumber.php';
               
          

            break;
            case 'getProductMaxQuantity':
                include './server/getProductQuantity.php';
            break;
            case 'addNewJobOrder':
            include './server/addNewJobOrder.php';
            break;
            case 'getAllJobOrders':
                include './server/getAllJobOrders.php';
            break;
            case 'deleteJobOrder':
                include './server/deleteJobOrder.php';
            break;
            case 'updateProductQuantity':
                include './server/updateProductQuantity.php';
            break;
            //Supervsior lome
            case 'supervisorHome':
                readfile('./client/header.html');
                readfile('./client/supervisorMenu.html');
                readfile('./client/supervisorHome.html');
                readfile('./client/footer.html');
                
            break;
            case 'selectEmployee':

                readfile('./client/header.html');
                readfile('./client/supervisorMenu.html');
                readfile('./client/enterEmployeeHours.html');
                
                readfile('./client/footer.html');

            break;
            case 'enterEmployeeHours':

                include './server/enterEmployeeHours.php';
            break;
            case 'getAllUnfinishedJobOrders':
                include './server/getAllUnfinishedJobOrders.php';
            break;
            case 'getAllFinishedJobOrders':
                include './server/getAllFinishedJobOrders.php';
            break;
            case 'unfinishedJobs':
                readfile('./client/header.html');
                readfile('./client/supervisorMenu.html');
                readfile('./client/unfinishedJobs.html');
                readfile('./client/footer.html');
            break;
            
            case 'jobOrderCompleted':
                include './server/markJoborderAsComplete.php';
            break;
            case 'seeProductStats':
                readfile('./client/header.html');
                readfile('./client/supervisorMenu.html');
                readfile('./client/productStats.html');
                readfile('./client/footer.html');
            break;
            case 'getEstTimeToBuild':
                include './server/getEstTimeToBuild.php';
            break;
            case 'getProductName':
                include './server/getProductName.php';
            break;
            case 'getTotalHoursWorkedOnJoborder':
                include 'getTotalHoursWorkedOnJoborder.php';
            break;
            case 'getAllFinishedTimesheets':
                include './server/getFinishedTimesheets.php';
            break;
            case 'logout' :
                $_SESSION['username'] = null;
                readfile('./client/header.html');
                readfile('./client/login.html');
                readfile('./client/footer.html');
            


        }
    }
}
catch (Exception $e){
    echo "PHP ERROR " . $e->getMessage();
}