app.controller('enduserController', function ($scope, enduserService,$log) {
    $scope.OperType = 1;
   
    //1 Mean New Entry  

    GetAllRecords();
    //To Get All Records  
    function GetAllRecords() {
        var promiseGet = enduserService.getAllProduct();
        promiseGet.then(function (pl) {
            $scope.EndUser = pl.data
        },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function (endUserDetails) {
      
        $scope.abc = [];
        for (i in endUserDetails) {
            $scope.abc.push({
                ProductName: endUserDetails[i].productName,
                Assigned: endUserDetails[i].assigned,
                ProductID: endUserDetails[i].productID
            });
        }
var promisePost = enduserService.post($scope.abc);
        promisePost.then(function (pl) {
          
            $scope.Message = "Your Successfuly Followed Products";
            GetAllRecords();
            //   ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });
      
    };
});