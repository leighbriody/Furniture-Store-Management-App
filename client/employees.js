
Vue.component('edit-employee' , 
{

    
   
    data  () {
        return {
            employeeId : "",
           firstName : "",
            lastName : "",
            email: "",
            telephone :"",
            DOB : "",

        }
    },
    props : ['employee'],
        

         
        
        

    
    
    template: `
    

    <div>
    
    <div class="card">
        <div class="card-header">
            <h2>Update employee : {{employee.first_name}}</h2>
        </div>

        <div class="card-body p-0">

            <table class="table-hover table">

                <thead>
                    <tr>
                        <th>Employee Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>DOB</th>
                        <th>Cancel</th>
                        <th>Update</th>
                        



                    </tr>
                </thead>
                <tbody>




                    <tr>


                        <td>


                            {{employee.employee_number}}



                        </td>

                        <td>
                            <input type="text" v-model="firstName" class="form-control">

                        </td>

                        <td>

                            <input type="text" v-model="lastName" class="form-control">
                        </td>

                        <td>

                            <input type="text" v-model="email" class="form-control">
                        </td>

                        <td>

                            <input type="text" v-model="telephone" class="form-control">
                        </td>


                        <td>

                            <input type="text" v-model="DOB" class="form-control">
                        </td>

                        

                <td>
                <button type="button"  v-on:click="$emit('cancel')"  aria-label="cancel"class=" cancel btn btn-danger">Cancle</button>
                
                </td>
                <td> 

                <button type="button" v-on:click="updateEmployee" class="btn btn-primary bn-s">Update</button>
                
                </td>




                        




                    </tr>
        </div>
        </tbody>
        
        </table>

    </div>
</div>
    






        
    `,

   



      created: function () {
        
        //We set the variables so the current data will be in the edit input for the user to change
        this.employeeId = this.employee.employee_number;
        this.firstName = this.employee.first_name;
        this.lastName = this.employee.last_name;
        this.email = this.employee.email;
        this.DOB = this.employee.DOB;
        this.telephone = this.employee.telephone;

        },

        methods : {
            updateEmployee : function(){

                //create the necesary object and change to a string.
                let updateEmployeeObj = {ID:this.employeeId , firstName:this.firstName , lastName:this.lastName , email:this.email , telephone:this.telephone , DOB:this.DOB};
                let employeeStr = "action=updateEmployee&x=" + JSON.stringify(updateEmployeeObj);
        
                //console log helpful info
                console.log("Update employee number " , this.employeeId , "New details " , this.firstName  ," " , this.lastName , " " , this.email , " " , this.telephone , " " , this.DOB);
                
                //create instance of this and post our string to the controller
                var v = this;
                $.post("controller.php",employeeStr , function(){
                  
                //refresh the window 
                window.location.reload();
                  
        
                    //if failed console log info
                }).fail(function(status){
                    console.log("employee.updateEmployee . FAIL :" , status.statusText);
                })
        
        
                 
                
            },
            
        }

}
)



//Add employee component
Vue.component('add-employee',
    {
        data: function () {
            return {
              
                showForm: true,
                firstName: "",
                lastName: "",
                email: "",
                telephone: "",
                DOB: "",
                ID: "",
               

            }
        },

        props: ['addEmployee'],
        template:
            `
        
        <div >

    <h1 class="center">Add Employee</h1>
    <p>Employee added sucess or failure here</p>
       <div class="form-group">
          <label for="">First Name</label>

              <input type="text" class="form-control border-primary" v-model="firstName">

       </div>
       <div class="form-group">
           <label for="">Last Name</label>

               <input type="text" class="form-control border-primary" v-model="lastName">

        </div>

        <div class="form-group">
           <label for="">Email</label>

               <input type="text" class="form-control border-primary" v-model="email">

        </div>

        <div class="form-group">
           <label for="">Telephone</label>

               <input type="text" class="form-control border-primary" v-model="telephone">

        </div>

        <div class="form-group">
           <label for="=">DOB</label>
             <input class="form-control border-primary" type="date" formt="yyyy-mm-dd" value="0" v-model="DOB">
        </div>


       


       <button type="submit" class="btn btn-primary" v-on:click="addEmp">Add New Employee</button>
   
       
</div>
 
        `,

        methods: {

            addEmp: function () {

                //create the necesary object and change to a string.
                let msgObj = { firstName: this.firstName, lastName: this.lastName, email: this.email, telephone: this.telephone, DOB: this.DOB };
                let msgStr = "action=addEmployee&x=" + JSON.stringify(msgObj);

                var v = this;

                //post to controller
                $.post("controller.php", msgStr, function () {
                    //clear fields after success send
                    v.firstName = "";
                    v.lastName = "";
                    v.email = "";
                    v.telephone = "";
                    v.DOB = "";

                    //reload the page so they can see the e
                    window.location.reload();

                }).fail(function (status) {
                    //if failed log helpfull error info
                    console.log("add employee. Fail :", status.statusText);
                });


            },

            
          





        },
      


    }
)



new Vue(
    {
        el: "#employee",
        data: {
            props:['employee'],
            employees: [],
            edit : false ,
            addEmployeeForm : false  ,
          viewAllEmployeeTable : false,
            employeeToEdit : null,
            pageCount : 1,
            selPage : 0
            
           
           
            
            



        },
        methods: {


            //Event to toggle if add employee form will show or hide.
            toggleAddEmployeeForm(){

                if(this.addEmployeeForm == false){
                    this.addEmployeeForm =true;
                }else {
                    this.addEmployeeForm = false;
                }

            },
            
            
            //Event to toggle if employee table will show or hide.
            toggleViewAllEmployeeTable(){

                if(this.viewAllEmployeeTable == false){
                    this.viewAllEmployeeTable =true;
                }else {
                    this.viewAllEmployeeTable = false;
                }

            },

            //when edit employee button is clicked set edit to true and set employeeToEdit to the chosen employee passed as a paramater.
            editEmployee : function(employee){
                this.edit = true;
                this.employeeToEdit = employee;
                

            },

            //When cancel edit is clicked set variables back to false and null state.
            cancelEdit : function(){
                this.edit = false;
                this.employeeToEdit = null;
                

            },


            deleteEmployee: function ($employee) {
                //Create our string with x = employee id passed as a paramater and post to controller.

                let msgStr = "action=deleteEmployee&x=" + $employee;

                $.post("controller.php", msgStr, function () {
                    
                    //reload the page so the user is removed
                    window.location.reload();
                }).fail(function (status) {
                    console.log("Employee.deleteEmployee. FAIL :" , status.statusText);
                })




            },
        

            
        },
        
        computed : {
            //this computed allows us to only see 5 users at once and use the paginator feature.
            displayEmployees : function(){
        
              let displEmp = [];
              
              let boxEmp = this.employees;
          
              for(let i=0;i<5;i++){
                  if(this.selPage*5+i < boxEmp.length){
                    displEmp.push(boxEmp[this.selPage*5+i]);
                    
                  }
              }
              //set number of pages
              this.pageCount = Math.ceil(boxEmp.length / 5);
              console.log("Return " , displEmp);
              return displEmp;
            }
        },


        created: function () {
            //Get all the employees and put into array.
            var vm = this;
            $.get("controller.php?action=getAllEmployee", function (data, status) {
                console.log("employee.created : data = ", data);
                vm.employees = data;
            }).fail(function (status) {
                console.log("messageBox.created. FAIL ", status.responseText);
            });
        }
    }
);