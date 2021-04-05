new Vue(
    {
        el: "#joborderStats",
        data: {

            joborders: [],
            finishedTimesheets: [],
            estJobOrderTime: "",
            json: [],










        },
        methods: {

            //method that takes job order as paramater loops trough finished timesheets and returns the sum of all those finished timesheets matching

            getTotalHoursSpentOnJoborder: function ($id) {

                //To get tot total hours spent on a job order we pass the id in as a paramater



                var total = 0;
                //Want to loop trough the finished timesheets
                //if the job order number matches the id add the weekly hours to the total and return total
                //Finishedtimsheets[] holds all the finished timesheets so we can use that id passed in as a condition.
                for (var i = 0; i < this.finishedTimesheets.length; i++) {
                    console.log("Loop ", this.finishedTimesheets[i]);
                    if (this.finishedTimesheets[i].job_order_number == $id) {
                        //If it matches get hours spent each day change to a number
                        var monday = Number(this.finishedTimesheets[i].monday);
                        var tuesday = Number(this.finishedTimesheets[i].tuesday);
                        var wednesday = Number(this.finishedTimesheets[i].wednesday);
                        var thursday = Number(this.finishedTimesheets[i].thursday);
                        var friday = Number(this.finishedTimesheets[i].friday);
                        var saturday = Number(this.finishedTimesheets[i].saturday);
                        var sunday = Number(this.finishedTimesheets[i].sunday);

                        total = total + monday + tuesday + wednesday + thursday + friday + saturday + sunday;

                    }
                }

                return total;

            },

            getEmployeeCost: function (actualTime) {
                //Assuming employees ar on a standard rate of 10e an hour 

                //we multiply that by the actual time spent on the job;
                return actualTime * 10;
            },

            //Get loss or gain we return the price of sale - the price of the cost to build and the employee cost 
            getLossOrGain: function (salePrice, costToBuild, employeeCost) {

                return salePrice - (costToBuild + employeeCost);

            },


            //To get the estimate time to build we return the products est time to build multiplied by the quantity ordered.
            computeEstTimeToBuild: function (productBuildTime, qty) {

                return productBuildTime * qty;
            },

            //To get the cost to build we get the product cost to build multiplied by the quantity of that product ordered
            computeCostToBuild: function (materialCost, qty) {

                return materialCost * qty;
            },

            //To get the sale price we retun the product price multiplied by the quantity
            salePrice: function (price, qty) {

                return price * qty;

            },

            //Here we have the method that will export our table to excel.
           exportTableToExcel : function (tableID, filename = ''){
                var downloadLink;
                var dataType = 'application/vnd.ms-excel';
                var tableSelect = document.getElementById(tableID);
                var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
                
                // Specify file name
                filename = filename?filename+'.xls':'excel_data.xls';
                
                // Create download link element
                downloadLink = document.createElement("a");
                
                document.body.appendChild(downloadLink);
                
                if(navigator.msSaveOrOpenBlob){
                    var blob = new Blob(['\ufeff', tableHTML], {
                        type: dataType
                    });
                    navigator.msSaveOrOpenBlob( blob, filename);
                }else{
                    // Create a link to the file
                    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
                
                    // Setting the file name
                    downloadLink.download = filename;
                    
                    //triggering the function
                    downloadLink.click();
                }
            }

         






        },


        computed: {



        },

        created: function () {

            //get all the job orders that are currently finished as we only want to see the stats on finished ones.
            var vm = this;

            $.get("controller.php?action=getAllFinishedJobOrders", function (data, status) {
                console.log("joborderStats.created all finished job orders : data = ", data);
                vm.joborders = data;
                console.log(data);

            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });


            
            //this will get all the timesheets that are on a finished job order.
            $.get("controller.php?action=getAllFinishedTimesheets", function (data, status) {
                console.log("joborderStats.created 2  all finished timesheets : data = ", data);
                vm.finishedTimesheets = data;


            }).fail(function (status) {
                console.log("orderDetails.created. FAIL ", status.responseText);
            });

            //Get all finished job orders 


        }
    }
);