new Vue(
    {
        el: "#unfinishedJobs",
        data: {
          
            unfinishedJoborders : [],
          allOrdersCurrentlyFinished : false ,
          pageCount : 1,
          selPage : 0








        },
        methods: {

            


            joborderComplete: function ($joborder_id) {



                let msgStr = "action=jobOrderCompleted&x=" + $joborder_id;
                $.post("controller.php", msgStr, function () {

                console.log(msgStr);
                 //reload window 
                 window.location.reload();

                }).fail(function (status) {
                    console.log("unfinishedOrders.joborderComplete. FAIL :", status.statusText);
                })




            },

            computeTotalCost: function (price, qty) {



                return price * qty;



            },

    
        },

        computed : {
            displayJobs : function(){
              let disJobs = [];
              
              let boxJobs  = this.unfinishedJoborders;
          
              for(let i=0;i<5;i++){
                  if(this.selPage*5+i < boxJobs.length){
                    disJobs.push(boxJobs[this.selPage*5+i]);
                    
                  }
              }
              //set number of pages
              
              this.pageCount = Math.ceil(boxJobs.length / 5);
              
              return disJobs;
            }
        },

    

        created: function () {
            var vm = this;

            $.get("controller.php?action=getAllUnfinishedJobOrders", function (data, status) {
                console.log("unfinishedJoborders.created : data = ", data);
                vm.unfinishedJoborders = data;

                
                if(!data){
                    this.allOrdersCurrentlyFinished = true;
                }
                
                
               
            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });


        }
    }
);