new Vue(
    {
        el: "#enterHours",
        data: {
            employees: [],

            employeeId: "",
            jobOrders: [],
            employee: "",
            weekEnding: "",
            jobOrder: "",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: "",
            saturday: "",
            sunday: "",
            total: ""





        },
        methods: {

            //Method to submit the hours the supervisor has entered on a joborder
            submitHours: function () {

                //Create object , change to string and post to controller.
                let timesheetObj = {
                    employeeId: this.employeeId, weekEnding: this.weekEnding, joborder: this.jobOrder, monday: this.monday,
                    tuesday: this.tuesday, wednesday: this.wednesday, thursday: this.thursday, friday: this.friday, saturday: this.saturday, sunday: this.sunday,
                };

                let msgStr = "action=enterEmployeeHours&x=" + JSON.stringify(timesheetObj);

                console.log(msgStr);
                var v = this;

                $.post("controller.php", msgStr, function () {


                    //reload the page so they can see the e
                    window.location.reload();

                }).fail(function (status) {
                    console.log("add employee. Fail :", status.statusText);
                });


            },


            getTotalHours: function () {
                console.log("called");
                this.total = Number(this.monday) + Number(this.tuesday) + Number(this.wednesday)
                    + Number(this.thursday) + Number(this.friday) + Number(this.saturday) + Number(this.sunday);

            }




        },





        created: function () {

            var vm = this;
            $.get("controller.php?action=getAllEmployee", function (data, status) {
                console.log("employee.created : data = ", data);
                vm.employees = data;
            }).fail(function (status) {
                console.log("enterHours.created. FAIL ", status.responseText);
            });


            $.get("controller.php?action=getAllJobOrders", function (data, status) {
                console.log("JobOrders.created : data = ", data);
                vm.jobOrders = data;
            }).fail(function (status) {
                console.log("EnterHours.created. FAIL ", status.responseText);
            });
        }


    }
)