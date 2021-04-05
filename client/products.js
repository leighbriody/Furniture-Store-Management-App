//this vue component contains the html and js code to view the message body
Vue.component('add-product',
    {
        data: function () {
            return {
                showForm: true,
                ID : "",
                name : "",
                price : "",
                timeToBuild : "",
                materialCost :"",
                description :"",
                quantity: "",

            }
        },

        props: ['product'],
        template:
            `
            
            
        <div>
        <div class="addProductDiv">
            <h1 class="center test">Add Product</h1>
             <p>Product added sucess or failure here</p>
                <div class="form-group">
                   <label for="">Product Name</label>

                       <input type="text" class="form-control border-primary" v-model="name">

                </div>
                <div class="form-group">
                  <label for="">Price</label>
                    <input class="form-control border-primary" type="number" value="0" v-model="price">
                </div>

                <div class="form-group">
                  <label for="">Time To Build (Hrs)</label>
                     <input class="form-control border-primary" type="number" value="0" v-model="timeToBuild">
                 </div>

                <div class="form-group">
                   <label for="=">Material Costs</label>
                       <input class="form-control border-primary" type="number" value="0" v-model="materialCost">
                 </div>

                <div class="form-group">
                    <label for="=">Quantity</label>
                      <input class="form-control border-primary" type="number" value="0" v-model="quantity">
                 </div>


                <div class="form-group border-primary">
                    <label for="">Product Description</label>

                      <textarea class="form-control border-primary" id="exampleTextarea" rows="3" v-model="description"></textarea>

                </div>


                <button type="submit" class="btn btn-primary" v-on:click="addProduct">Add New Product</button>
                
    </div>
           
 
      </div>
      
       
        `,

        methods: {

           
            //Toggle form 
            toggleForm: function () {

                if(showForm == true){
                    showForm = false;
                }else {
                    showForm = true;
                }

                


            },
            addProduct : function($data){

                //Create object and change to string
                let productObj = { ID:this.ID ,name:this.name , price:this.price , timeToBuild:this.timeToBuild , materialCost:this.materialCost , description:this.description , quantity:this.quantity};
                let productStr = "action=addNewProduct&x=" +JSON.stringify(productObj);
                console.log("prst" , productStr);

                
                console.log("Add  " , this.ID , " " , this.name , " " , this.price , " " , this.timeToBuild , " " , this.materialCost , " " , this.description , " " , this.quantity );
                var v = this;
                $.post("controller.php",productStr , function(){
                    //clear fields after success send
                    v.name = "";
                    v.price = "";
                    v.timeToBuild = "";
                    v.materialCost = "";
                    v.description = "";
                    v.quantity = "";

                }).fail(function(status){
                    console.log("addProduct.addProduct. FAIL :" , status.statusText);
                })

            },
           
            



        },


    }
)








new Vue (
    {
        el: "#product",
        data :{
            
            products : [],
            
            showForm : false,
            showProductsTable : false,
            edit : false,
            pageCount : 1,
            selPage : 0,
            editForm : {
                productId : "",
                productName :"",
                productPrice : "",
                timeToBuild: "",
                materialCost:"",
                description : "",
                quantity : ""
                

            },
            
           
        },
        methods : {
           
        
            updateProduct:function(){

                //Create object and change to a string
                let updateProductObj = {productId:this.editForm.productId , productName:this.editForm.productName , productPrice:this.editForm.productPrice , timeToBuild:this.editForm.timeToBuild , materialCost:this.editForm.materialCost , description:this.editForm.description, quantity:this.editForm.quantity};
                let productStr = "action=updateProduct&x=" + JSON.stringify(updateProductObj);
    
                console.log("Update product id " , this.editForm.productId , "New details " , this.editForm.productName  ," " , this.editForm.productPrice , " " , this.editForm.timeToBuild, " " , this.editForm.materialCost , " " , this.editForm.description , " " , this.editForm.quantity);
                
                var v = this;
                $.post("controller.php",productStr , function(){
                  
                    //reload the page so they can see the e
                    window.location.reload();
                  
    
                    //maybe reload the page ??
                }).fail(function(status){
                    console.log("product.updateProduct . FAIL :" , status.statusText);
                })
    
    
                 
                
            },

    

            deleteProduct: function ($product) {

                //create string with product id passed as a paramater 
                let msgStr = "action=deleteProduct&x=" + $product;
                $.post("controller.php", msgStr, function () {
                    
                    //reload the page so the user is removed
                    window.location.reload();
                }).fail(function (status) {
                    console.log("Product.deleteProduct . FAIL :" , status.statusText);
                })




            },

            editProduct : function(product){

                this.edit = true;
            
                //we set the editForm variables to the product chosens values.
               this.editForm.productId = product.product_id;
               this.editForm.productName =  product.product_name;
               this.editForm.productPrice = product.product_price;
               this.editForm.timeToBuild = product.time_to_build;
               this.editForm.materialCost =  product.material_cost;
               this.editForm.description = product.description;
               this.editForm.quantity =  product.quantity;
            },


            cancelEdit : function(){
                this.edit = false;
            },


            toggleForm: function () {

                if(this.showForm == true){
                    this.showForm = false;
                }else {
                    this.showForm = true;
                }

                


            },
            toggleProductsTable: function () {

                if(this.showProductsTable == true){
                    this.showProductsTable = false;
                }else {
                    this.showProductsTable = true;
                }

                


            },
            
        },

        computed : {
            //Allows the use of a paginator
            displayProducts : function(){
              let dispProducts = [];
              
              let boxProduct  = this.products;
          
              for(let i=0;i<5;i++){
                  if(this.selPage*5+i < boxProduct.length){
                    dispProducts.push(boxProduct[this.selPage*5+i]);
                    
                  }
              }
              //set number of pages
              
              this.pageCount = Math.ceil(boxProduct.length / 5);
              
              return dispProducts;
            }
        },

        


        
        created: function () {
            var vm = this;
            $.get("controller.php?action=getAllProducts", function (data, status) {
                console.log("product.created : data = ", data);
                vm.products = data;
            }).fail(function (status) {
                console.log("product.created. FAIL ", status.responseText);
            });
        }
       

    }
)