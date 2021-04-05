
Vue.component('edit-joborder',
    {



        data() {
            return {
                jobOrderId: "",
                jobOrderNumber: "",
                customer: "",
                product: "",
                quantity: "",
                requiredBy: "",
                products: [],
                productId: "",
                maxQuantity  : "",
                currentQuantityInOrder: "",
                previousOrderQuantity : "",
                updateQuantityRange :[]


            }
        },
        props: ['joborder'],








        template: `
    

    <div>
    <h2>Edit joborder allows you to change the quantity of the order.</h2>
    <p>This job order currently has {{currentQuantityInOrder}} of {{joborder.product_name}} ordered. </p>
    <table class="table-hover table">
    
        <thead>
            <tr>
              <th>JobOrder ID</th>
             <th>Job Order Number</th>
             <th>Customer</th>
                <th>Product</th>
              <th>Quantity</th>
             <th>Required By</th>
             <th>Cancle</th>
             <th>Update </th>
            </tr>
        </thead>
        <tbody>

            <tr>
               <td>
                {{joborder.job_orders_id}}
               </td>

               
               <td>
               {{joborder.job_order_number}}
               </td>
              
               <td>
               <input type="text" name="customer" v-model="customer" class="form-control">
               </td>

               <td>

                    {{product}}            
                
               </td>

               <td>

               <select v-model="quantity" name="qantity" class="form-control border-primary">
                                    <option v-for="n in maxQuantity " :value="n">
                                        {{n}}</option>
                                </select>
                           
               </td>

               <td>
               
               {{joborder.required_by}}
               </td>

             <td>

            <button type="button"  class="btn btn-danger" v-on:click="$emit('cancel')"  aria-label="cancel" >Cancle</button>

            </td>

              <td>
              
              <button type="button"  class="btn btn-primary bn-s">Update</button>
              
              </td>
            </tr>
            

        </tbody>


</table>


</div>
    






        
    `,





  
        methods: {

           


        },
        created: function () {
            var vm = this;

            console.log("Edit Job Order : " , this.joborder);
            //Set the edit 
            this.currentQuantityInOrder = this.joborder.quantity;
            this.customer = this.joborder.customer_name;
            this.jobOrderNumber = this.joborder.job_orders_number;
            this.product = this.joborder.product_name;
            this.previousOrderQuantity = this.joborder.quantity;
            

           
             let str = "action=getProductMaxQuantity&x=" + this.joborder.product_id;
             console.log("Get product quantity", str);

             //post to controller
             $.post("controller.php", str, function (data, status) {

                 //reload the page so they can see the e
                 console.log("on change success data =  ", data);
                 vm.maxQuantity = data;
                 


                 
             }).fail(function (status) {
                 console.log("on change  . FAIL :", status.statusText);
             })
            
        
             console.log("Previous order before edit has " , this.previousOrderQuantity);
             console.log("The stock left of product is " , this.maxQuantity);

            

           
            $.get("controller.php?action=getAllProducts", function (data, status) {
                console.log("orderDetails.created : data = ", data);
                vm.products = data;
            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });


        }


    }
)










//Vue component which will allow admin to create a job order
Vue.component('create-job-order',
    {
        data: function () {
            return {

                products: [],
                nextOrderNumber: "",
                quantity: "",
                product_id: "",
                test: "working",
                selected: "",
                maxQuantity: "",
                customerName: "",
                requiredByDate: "",
                createJobOrder: false,
                unfinished : "unfinished"

            }
        },

        props: [''],
        template:
            `
            <div class="card">
            <div class="card-header">
                <h2>Enter Order</h2>

            </div>

            <div class="card-body p-0">

                <table class="table-hover table">

                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Customer Name</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Required By</th>
                            <th>Add</th>





                        </tr>
                    </thead>
                    <tbody>




                        <tr>


                            <td>


                                <!--This has to be the next id of job orders-->
                               <span># {{nextOrderNumber}}</span>



                            </td>

                            <td>
                                <input required type="text" v-model="customerName" class="form-control" >

                            </td>

                            <td>

                                <select v-model="product_id" name="product" class="form-control border-primary" @change="onChange(product_id)">
                                    <option v-for="product of products" :value="product.product_id">
                                        {{product.product_name}}</option>
                                </select>
                            </td>

                            <td>
                                <!--This select list max will be based on the product select list-->
                                
                                <select v-model="quantity" name="qantity" class="form-control border-primary">
                                    <option v-for="n in maxQuantity" :value="n">
                                        {{n}}</option>
                                </select>



                               

                                
                            </td>

                            <td>
                                <!--This select list max will be based on the product select list-->
                                
                                <input type="date" v-model="requiredByDate" class="form-control">
                                
                            </td>






                       


                            <td> <button type="button" v-on:click="addJobOrder()" class="btn btn-primary bn-s"
                                    >Add</button></td>




                        </tr>
            </div>
            </tbody>
            </table>

        </div>
        
        `,

        methods: {


            //When the product select chanegs this event will trigger to change the quantity available.
            onChange(id) {
                console.log(id);
                var vm = this;






                let str = "action=getProductMaxQuantity&x=" + id;

                console.log("Get product quantity", str);


                $.post("controller.php", str, function (data, status) {

                    //reload the page so they can see the e
                    console.log("on change success data =  ", data);
                    vm.maxQuantity = data;


                    //maybe reload the page ??
                }).fail(function (status) {
                    console.log("on change  . FAIL :", status.statusText);
                })




            },

            //Add the job order
            addJobOrder: function ($data) {

                //We create our objects and str to add a job order
                
                let jobOrderObj = { orderNumber: this.nextOrderNumber, customerName: this.customerName, productID: this.product_id, quantity: this.quantity, requiredByDate: this.requiredByDate , state: this.unfinished };
                let jobOrderStr = "action=addNewJobOrder&x=" + JSON.stringify(jobOrderObj);

                console.log("Add job order " , jobOrderStr);

                //Create objects and str to update the product quantity once the order done.
                let updateProductQuantityObj = { productId: this.product_id, quantityOrdered: this.quantity };
                let updateProductQuantityStr = "action=updateProductQuantity&x=" + JSON.stringify(updateProductQuantityObj);


                console.log("Add new job order ", this.nextOrderNumber, " ", this.customerName, " ", this.product_id, " ", this.quantity, " ", this.requiredByDate);

                var v = this;
                $.post("controller.php", jobOrderStr, function () {


                    //now we must update the quantity of that product 
                    //we must decrease the quantity of the product by the ammount the user has chosen

                    console.log("Update object ", updateProductQuantityObj)

                    console.log("Updating product id and decrease quantity of ", updateProductQuantityStr);

                    $.post("controller.php", updateProductQuantityStr, function () {

                        //Now we ca reload the page
                       window.location.reload();

                    }).fail(function (status) {
                        console.log("Update Product Quantity Failed.addProduct. FAIL :", status.statusText);
                    })

                }).fail(function (status) {
                    console.log("addProduct.addProduct. FAIL :", status.statusText);
                })

            },








        },
        created: function () {
            var vm = this;
            //Get all curreent products and put into array.
            $.get("controller.php?action=getAllProducts", function (data, status) {
                console.log("orderDetails.created : data = ", data);
                vm.products = data;
            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });


            //get next job order number
            $.get("controller.php?action=getNextOrderNumber", function (data, status) {
                console.log("orderDetails.created2 : data = ", data);

                //If data is null it means no records so we start at 1

                vm.nextOrderNumber = data + 1;
            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });
        }




    },



)















new Vue(
    {
        el: "#enterOrderDetails",
        data: {
            props: [''],
            viewOrders : false,
            selected: "",
            product_id: "",
            viewAllJobOrders: true,
            createJobOrder: false,
            products: [],
            joborders: [],
            edit: false,
            joborderToEdit: null,
            pageCount : 1,
            selPage : 0
           








        },
        methods: {

            toggleCreateJobOrder: function () {

                if (this.createJobOrder == false) {
                    this.createJobOrder = true;
                } else {
                    this.createJobOrder = false;
                }
            },

            toggleEditJobOrder: function () {

                if (this.edit == true) {
                    this.edit = false;
                } else {
                    this.edit = true;
                }

            },
            toggleViewJobOrders : function(){
                if(this.viewOrders == false ){
                    this.viewOrders = true;
                }else {
                    this.viewOrders = false;
                }
            },

            cancelEdit : function(){
                this.joborderToEdit = null;
                console.log("called ");
            },

            getProductQuantity: function ($product) {

                //takes a product 
                //gets the quantity of that product and puts it in quantity


            },

            deleteJobOrder: function ($joborder_id) {



                let msgStr = "action=deleteJobOrder&x=" + $joborder_id;
                $.post("controller.php", msgStr, function () {

                    //reload the page so the user is removed
                    window.location.reload();
                }).fail(function (status) {
                    console.log("Employee.deleteEmployee. FAIL :", status.statusText);
                })




            },

            editJobOrder: function (joborder) {
                this.edit = true;

                this.joborderToEdit = joborder;
                console.log(joborder);





            },

            onChange(id) {

                var vm = this;


                console.log("change")



                let str = "action=getProductMaxQuantity&x=" + id;

                console.log("Get product quantity", str);


                $.post("controller.php", str, function (data, status) {

                    //reload the page so they can see the e
                    console.log("on change success data =  ", data);
                    vm.editForm.maxQuantity = data;


                    //maybe reload the page ??
                }).fail(function (status) {
                    console.log("on change  . FAIL :", status.statusText);
                })




            },








        },

        computed : {
            displayOrders : function(){
              let dispOrders = [];
              
              let boxOrder = this.joborders;
          
              for(let i=0;i<5;i++){
                  if(this.selPage*5+i < boxOrder.length){
                    dispOrders.push(boxOrder[this.selPage*5+i]);
                    
                  }
              }
              //set number of pages
              this.pageCount = Math.ceil(boxOrder.length / 5);
              console.log("Return display orders " , dispOrders);
              return dispOrders;
            }
        },



        created: function () {
            var vm = this;
            $.get("controller.php?action=getAllJobOrders", function (data, status) {
                console.log("orderDetails.created : data = ", data);
                vm.joborders = data;
            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });


            $.get("controller.php?action=getAllProducts", function (data, status) {
                console.log("orderDetails.created : data = ", data);
                vm.products = data;
            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });
        }
    }
);