﻿app.controller('updateController', function ($scope, updateService, $location,$routeParams) {
    $scope.OperType = 1;
    $scope.ProductID = $routeParams.productID;
    var id = $scope.ProductID;
    //1 Mean New Entry  
    GetAllRecords();
    //To Get All Records  
    function GetAllRecords() {
        var promiseGet = updateService.getAllUpdate(id);
        promiseGet.then(function (pl) {
          
            $scope.Update = pl.data;
        },
              function (errorPl) {
                    $log.error('Some Error in Getting Records.', errorPl);  

              });
    }

    //To Clear all input controls.  
    function ClearModels() {
        $scope.OperType = 1;
        $scope.UpdateID = "";
        $scope.UpdateIntro = "";
        $scope.UpdateDetail = "";

    }

    //To Clear all Inputs controls value.  
    $scope.clear = function () {
        $scope.OperType = 1;
        $scope.UpdateID = "";
        $scope.UpdateIntro = "";
        $scope.UpdateDetail = "";
       
    }


    //To Delete Update  
    $scope.delete = function (Update) {
        var promiseDelete = updateService.delete(Update.updateID);
        promiseDelete.then(function (pl) {
            $scope.Message = "Update Deleted Successfuly";
            GetAllRecords();
             ClearModels();
            //     $location.path('/login?id=' + ProductNew.productID);
        }, function (err) {
            console.log("Err" + err);
        });

    }
    //To Create new record 
    $scope.save = function () {
        var Update = {
            UpdateIntro: $scope.UpdateIntro,
            UpdateDetail: $scope.UpdateDetail
        };
      //  if ($scope.OperType === 1) {
            var promisePost = updateService.post(id,Update);
            promisePost.then(function (pl) {
                $scope.UpdateID = pl.data.UpdateID;
                $scope.Message = "Update Added Successfuly";
                GetAllRecords();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
//        }

    };


    $scope.addmedia = function (Update) {
        $location.path("/media/" + Update.updateID)
       // $rootScope.upid = Update.updateID;
    }

    $scope.checkIntro = function () {
       
        if ($scope.UpdateIntro.length > 140) {
            $scope.Message = "Introduction must be less than 140 characters.";
            return false;
        }
        else
            $scope.Message = "";
    }

    $scope.checkDetail = function()
    {
        var str=$scope.UpdateDetail;
        var words = str.split(/\b[\s,\.-:;]*/);
        var len = words.length;
        if (len > 0) {
            $scope.words = "Number of words : " + len;
        }
        else {
            $scope.words = "";
        }
        if (len > 1000) {
            $scope.UpdateDetail = (UpdateDetail.value.slice(0, -1));
            $scope.Message = "Not more than 1000 words are allowed";
          
            //  alert("You've reached the maximum allowed words.");
            return false;
        }
        else
            $scope.Message = "";
      
    }

});