app.controller('enduserproductController', function ($scope, enduserproductService,$log,$location) {
    $scope.OperType = 1;
  
    //1 Mean New Entry  

    GetAllRecords();
    //To Get All Records  
    function GetAllRecords() {
        var promiseGet = enduserproductService.getAllProduct();
        promiseGet.then(function (pl) {
            $scope.EndUser = pl.data
        },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
    }
    $scope.viewupdate = function (endUserDetails) {
        $location.path("/userupdate/" + endUserDetails.productID)
        //$rootScope.prodid = endUserDetails.productID;
    }

});