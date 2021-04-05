Vue.component('add-user',
    {
        data: function () {
            return {
                showForm: true,
                ID : "",
                username : "",
                password : "",
                type : "",
                test : "working",
                userTypes : ["admin","supervisor"]
                
               

            }
        },

        
        template:
            `
           
            <div>
              <div class="addNewUserDiv">
               
                <h1 class="center">Add User</h1>
                <p>User added sucess or failure here</p>
                <div class="form-group">
                    <label for="">Username</label>
    
                    <input type="text" class="form-control border-primary" v-model="username">
    
                </div>
                <div class="form-group">
                    <label for="">Password</label>
                    <input class="form-control border-primary" type="password" v-model="password">
                </div>
    
                <div class="form-group">
                    <label for="">Type </label>
                   
                    <select v-model="type" name="type" class="form-control border-primary ">
                     <option v-for="type of userTypes" :value="type">{{type}}</option>
                </select>


                </div>
    
    
    
    
    
    
    
    
    
                <button type="submit" class="btn btn-primary" v-on:click="addUser">Add New User</button>
    
            </div>
    
    
            </div>
            
        
      
       
        `,

        methods: {

           

            toggleForm: function () {

                if(showForm == true){
                    showForm = false;
                }else {
                    showForm = true;
                }

                


            },
            addUser : function(){

                let userObj = { ID:this.ID ,username:this.username , password:this.password , type:this.type };
                let userStr = "action=addNewUser&x=" +JSON.stringify(userObj);
                console.log("userString" , userStr);

                //working up to here fine.
                console.log("Add new user " , this.ID , " " , this.username , " " , this.password , " " , this.type);
                console.log(userStr);
                var v = this;
                $.post("controller.php",userStr , function(){
                    //clear fields after success send
                    v.username = "";
                    v.password = "";
                    v.type = "";
                    
                     //reload the page so they can see the e
                     window.location.reload();

                }).fail(function(status){
                    console.log("addUser.addProduct. FAIL :" , status.statusText);
                })

            },
           
            



        },

        created: function () {
           

        },


    }
)





new Vue(
    {
        el: "#users",
        data: {

            viewUsers : false ,
            users: [],
            pageCount : 1,
            selPage : 0,
            types: [],
            addUserForm : false ,
            showUsers : false





        },
        methods: {

            deleteUser: function ($user) {



                let msgStr = "action=deleteUser&x=" + $user;
                $.post("controller.php", msgStr, function () {

                    //reload the page so the user is removed
                    window.location.reload();
                }).fail(function (status) {
                    console.log("user.deleteUser . FAIL :", status.statusText);
                })




            },

            toggleAddUserForm : function(){


                if(this.addUserForm == false){
                    this.addUserForm = true;
                }else {
                    this.addUserForm = false;
                }
            } ,
            
            toggleShowUsers : function (){
                
                if(this.viewUsers == false ){
                    this.viewUsers = true;
                }else {
                    this.viewUsers = false;
                }
            }


        },

        computed : {
            displayUsers : function(){
              let dispUsers = [];
              
              let boxUsers  = this.users;
          
              for(let i=0;i<5;i++){
                  if(this.selPage*5+i < boxUsers.length){
                    dispUsers.push(boxUsers[this.selPage*5+i]);
                    
                  }
              }
              //set number of pages
              
              this.pageCount = Math.ceil(boxUsers.length / 5);
              
              return dispUsers;
            }
        },





        created: function () {
            var vm = this;
            $.get("controller.php?action=getAllUsers", function (data, status) {
                console.log("users.created : data = ", data);
                vm.users = data;
            }).fail(function (status) {
                console.log("users.created. FAIL ", status.responseText);
            });

        },

        

        






    }
);