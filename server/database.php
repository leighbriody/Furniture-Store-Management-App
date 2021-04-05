<?php

class Database {

    //connection details
    public static $host = "127.0.0.1";
    public static $db_name = "furniture_app";
    public static $username = "root";
    public static $password = "";

    //connection details
    private $conn;

    //constructor - setup connection - catch exception 
    function __construct(){

        $this->conn = new mysqli(self::$host , self::$username , self::$password , self::$db_name);
        if($this->conn->connect_errno){
            throw new Exception("DB connection failed. Status = " . $this->conn->connect_errno );
        }


    }

    //close connection 
    function __destruct(){
        $this->conn->close();
    }


    //get all products 
    function getAllProduct(){
        $sql = "SELECT * FROM product";
        $result = $this->conn->query($sql);
        $outp = array();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        return $outp;
    }

  

    //get all employees 
    function getAllEmployees(){
        $sql = "SELECT * FROM employees";
        $result = $this->conn->query($sql);
        $outp = array();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        return $outp;
    }

     //get all job orders  , use a join so we can get the product information we need also
 function getAllJobOrders(){
    $sql = "select joborders.job_order_number , joborders.job_orders_id , joborders.customer_name , joborders.state , joborders.required_by , joborders.quantity ,
     product.product_id, product.product_name , product.quantity from joborders join product on product.product_id = joborders.product_id where state != 'deleted'";
    $result = $this->conn->query($sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    return $outp;


}

    //add a new product
    function addNewProduct($data){
        
        $sql = "INSERT INTO product ( product_id, product_name, product_price , time_to_build, material_cost, description , quantity) VALUES ( ? , ? , ? , ? , ? , ? , ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssss", $ID , $productName , $productPrice , $timeToBuild , $materialCost , $description , $quantity);
        $ID = null;
        $productName = $data->name;
        $productPrice = $data->price;
        $timeToBuild = $data->timeToBuild;
        $materialCost = $data->materialCost;
        $description = $data->description;
        $quantity = $data->quantity;
        if(!$stmt->execute()){
            throw new Exception("Database.addNewProduct : execute failed (database.php line :" . __LINE__ . ")");
        }

       

    } 

    //delete employee
    function deleteEmployee($employeeNumber){
        $sql = "DELETE FROM employees Where employee_number = ? " ;
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s",$employeeNum);
        $employeeNum = $employeeNumber;
        if(!$stmt->execute()){
            throw new Exception("Database.deleteEmployee : execute failed (database.php line :" . __LINE__ . ")");
        }

    }

    //delete job order , instead of delete from database set the state to deleted.
     function deleteJobOrder($joborderId){
        $sql = "UPDATE joborders set state = 'deleted' Where job_orders_id = ? " ;
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s",$joborder_id);
        $joborder_id = $joborderId;
        if(!$stmt->execute()){
            throw new Exception("Database.deleteJobOrder : execute failed (database.php line :" . __LINE__ . ")");
        }

    }

    //delete product 
    function deleteProduct($product_id){
        $sql = "DELETE FROM product Where product_id = ? " ;
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s",$productId);
        $productId = $product_id;
        if(!$stmt->execute()){
            throw new Exception("Database.deleteProduct : execute failed (database.php line :" . __LINE__ . ")");
        }

    }


    //add new employee 
    function addNewEmployee($data){
        
        $sql = "INSERT INTO employees ( employee_number, first_name, last_name , email, telephone, DOB ) VALUES ( ? , ? , ? , ? , ? , ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssss", $empNo , $firstName , $lastName , $email , $telephone , $DOB);
        $empNo = null;
        $firstName = $data->firstName;
        $lastName = $data->lastName;
        $email = $data->email;
        $telephone = $data->telephone;
        $DOB = $data->DOB;
        
        if(!$stmt->execute()){
            throw new Exception("Database.addNewProduct : execute failed (database.php line :" . __LINE__ . ")");
        }

    } 
    

    //update employee
    function updateEmployee($data){
        $sql = "UPDATE employees Set first_name =  ? , last_name = ? , email = ? , telephone = ? , DOB = ? where employee_number = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssssss", $firstName , $lastName , $email , $telephone , $DOB , $empNo);
        $firstName = $data->firstName;
        $lastName = $data->lastName;
        $email = $data->email;
        $telephone = $data->telephone;
        $DOB = $data->DOB;
        $empNo = $data->ID;
        
        if(!$stmt->execute()){
            throw new Exception("Database.updateEmployee : execute failed (database.php line :" . __LINE__ . ")");
        }
    }


    //update product 
    function updateProduct($data){
        $sql = "UPDATE product Set product_name =  ? , product_price = ? , time_to_build = ? , material_cost = ? , description = ? , quantity = ?  where product_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssss", $productName , $productPrice , $timeToBuild , $materialCost , $description , $quantity , $productId);
        $productName = $data->productName;
        $productPrice = $data->productPrice;
        $timeToBuild = $data->timeToBuild;
        $materialCost = $data->materialCost;
        $description = $data->description;
        $quantity = $data->quantity;
        $productId = $data->productId;
        
        if(!$stmt->execute()){
            throw new Exception("Database.updateEmployee : execute failed (database.php line :" . __LINE__ . ")");
        }
    }


    //get all users
    function getAllUsers(){
        $sql = "SELECT * FROM user";
        $result = $this->conn->query($sql);
        $outp = array();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        return $outp;
    }

    //delete users
    function deleteUser($user){
        $sql = "DELETE FROM user Where ID = ? " ;
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s",$userID);
        $userID = $user;
        if(!$stmt->execute()){
            throw new Exception("Database.deleteProduct : execute failed (database.php line :" . __LINE__ . ")");
        }

    }


      //update Product Quantity 
      function updateProductQuantity($data){
        $sql = "Update product set quantity = quantity - ? where product_id = ?" ;
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ss",$quantityOrdered ,$product_id );
        $quantityOrdered = $data->quantityOrdered;
        $product_id = $data->productId;
        if(!$stmt->execute()){
            throw new Exception("Database.updateProductQuantity : execute failed (database.php line :" . __LINE__ . ")");
        }
    }


     //get all users types 
     function getAllUserTypes(){
        $sql = "SELECT distinct type FROM user";
        $result = $this->conn->query($sql);
        $outp = array();
        $outp = $result->fetch_all(MYSQLI_ASSOC);
        return $outp;
    }

   

     //add new user
     function addNewUser($data){
        
        $sql = "INSERT INTO user ( ID, username, password , type) VALUES ( ? , ? , ? , ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssss", $ID , $username , $password , $type);
        $ID = null;
        $username = $data->username;
        $password = $data->password;
        $type = $data->type;
        
        
        
        if(!$stmt->execute()){
            throw new Exception("Database.addNewProduct : execute failed (database.php line :" . __LINE__ . ")");
        }

    }
    

    
    //get all users types
    function getUserType($username , $password){
        $sql = "select type from user where username = '$username'";
        $result = $this->conn->query($sql);
        $type = $result->fetch_assoc();

        return $type;
        
    
}

//Check user is valid
function checkUserCredentials($username , $password){
    $sql = "select username , password from user where username = '$username'";
    $result = $this->conn->query($sql);
    $user = $result->fetch_assoc();

    //if a username matches
    if($user)
    {
        //password verify wont work so use if statement
        if($password == $user['password']){
            //if password matches then return true
            return true;
        }else {
            return false;
        }
       
        
     
    }else {
        return false;
    }
   
}

    //function to get the max job order number 
    //the next job order number will the this +1
function getNextOrderNumber(){
    $sql = "select max(job_order_number) from joborders";
    $result = $this->conn->query($sql);
    $num = $result->fetch_assoc();
    return $num;
    
}

//Get product max quantity , allows us to know how much is in stock
function getProductMaxQuantity($product_id){


    $sql = "select quantity from product where product_id = '$product_id'";
    $result = $this->conn->query($sql);
    $num = $result->fetch_assoc();
    return $num;

    
}

//add a new job order
function addNewJobOrder($data){

    $sql = "INSERT INTO joborders ( job_orders_id , job_order_number, customer_name , product_id , quantity , required_by , state) VALUES ( ? , ? , ? , ? , ? , ? , ? )";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("sssssss", $ID , $jobOrderNumber , $customer , $productId , $quantity , $requiredBy , $state);
        
        $id = null;
        $jobOrderNumber = $data->orderNumber;
        $customer = $data->customerName;
        $productId = $data->productID;
        $quantity = $data->quantity;
        $requiredBy = $data->requiredByDate;
        $state = $data->state;
        
    
        if(!$stmt->execute()){
            throw new Exception("Database.addNewProduct : execute failed (database.php line :" . __LINE__ . ")");
        }else {
            //decrease product quantity
        }


}

 //Enter Employee hours - adds hours employee worked on a job order
 function enterEmployeeHours($data){
        
    $sql = "INSERT INTO timesheets ( id , employee_id, job_sheet , week_ending , monday, tuesday, wednesday , thursday , friday , saturday , sunday ) VALUES ( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)";
    $stmt = $this->conn->prepare($sql);
    $stmt->bind_param("sssssssssss", $id , $empId , $job , $weekEnding , $monday , $tuesday , $wednesday , $thursday , $friday , $saturday , $sunday);
    $id = null;
    $empId = $data->employeeId;
    $job = $data->joborder;
    $weekEnding = $data->weekEnding;
    $monday = $data->monday;
    $tuesday = $data->tuesday;
    $wednesday = $data->wednesday;
    $thursday = $data->thursday;
    $friday = $data->friday;
    $saturday = $data->saturday;
    $sunday = $data->sunday;

    
    if(!$stmt->execute()){
        throw new Exception("Database.enterEmployeeHours : execute failed (database.php line :" . __LINE__ . ")");
    }

} 


 //getAllUnfinishedJoborders 
 function getAllUnfinishedJoborders(){
    $sql = "SELECT joborders.job_orders_id , joborders.job_order_number , joborders.customer_name , joborders.required_by ,joborders.quantity , product.product_id , product.product_name , product.product_price
     FROM joborders JOIN product ON joborders.product_id = product.product_id where joborders.state = 'unfinished'";
    $result = $this->conn->query($sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    return $outp;
}

// getAllFinishedJoborders
function getAllFinishedJoborders(){
    $sql = "SELECT * FROM joborders where state = 'finished'";
    $result = $this->conn->query($sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    return $outp;
}

//mark job order as complete 
function markJoborderAsComplete($data){

    $sql = "Update joborders set state = 'finished' where job_orders_id = ' $data '" ;
    $stmt = $this->conn->prepare($sql);
    

    if(!$stmt->execute()){
        throw new Exception("Database.markJobOrderAsComplete : execute failed (database.php line :" . __LINE__ . ")");
    }


}

//get the estimated time product takes to build
function getEstTimeToBuild($product_id ){


    $sql = "select time_to_build from product where product_id = '$product_id'";
    $result = $this->conn->query($sql);
    $timeToBuild = $result->fetch_assoc();
    return $timeToBuild;

    
}

//get a product name 
function getProductName($product_id ){


    $sql = "select product_name  from product where product_id = '$product_id'";
    $result = $this->conn->query($sql);
    $name = $result->fetch_assoc();
    return $name;

    
}

//get all finished job orders info 
function getAllFinishedJobOrdersStatsInfo(){

    $sql = "SELECT joborders.job_order_number , joborders.customer_name ,  product.product_id , product.product_name ,  product.time_to_build , product.material_cost , joborders.quantity , product.product_price
    FROM
    joborders JOIN product ON joborders.product_id = product.product_id
    where joborders.state = 'finished'";
    $result = $this->conn->query($sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    return $outp;


}


//get the hours worked on a job order
function getHoursWorkedOnJoborder($jobsheet){
    $sql = "select sum(monday + tuesday + wednesday + thursday + friday + saturday + sunday) from timesheets where job_sheet = '$jobsheet'";
    $result = $this->conn->query($sql);
    $hours = $result->fetch_assoc();
    return $hours;
    
    
    
}

//get all finished timesheets info
function getFinishedTimesheets(){

    $sql =  "select joborders.job_order_number , joborders.state , monday , tuesday , wednesday ,  thursday , friday , saturday , sunday 
    from timesheets join joborders on timesheets.job_sheet = joborders.job_order_number where joborders.state = 'finished'";
    $result = $this->conn->query($sql);
    $outp = array();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    return $outp;


}

}