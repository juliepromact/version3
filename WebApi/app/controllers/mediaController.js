app.controller('mediaController', ['$scope', 'mediaService', '$routeParams','$log','Upload', function ($scope, mediaService, $routeParams, $log, Upload) {
    //1 Mean New Entry  
    $scope.OperType = 1;

    $scope.UpdateID = $routeParams.updateID;

    var id = $scope.UpdateID;   
    GetAllRecords();
    //To Get All Records  
    function GetAllRecords() {
        var promiseGet = mediaService.getAllMedia(id);
        promiseGet.then(function (pl) {
            $scope.Media = pl.data;
        },
              function (errorPl) {
                  $log.error('Some Error in Getting Records.', errorPl);
              });
    }

    //To Clear all input controls.  
    function ClearModels() {
        $scope.OperType = 1;
        $scope.MediaName = "";
        $scope.VideoUrl = "";
    }

    //To Clear all Inputs controls value.  
    $scope.clear = function () {
        $scope.OperType = 1;
        $scope.MediaName = "";
        $scope.VideoUrl = "";
      }

    //To Delete Media  
    $scope.delete = function (Media) {
        var promiseDelete = mediaService.delete(Media.mediaID);
        promiseDelete.then(function (pl) {
            $scope.Message = "Media Deleted Successfuly";
            GetAllRecords();
            ClearModels();
        }, function (err) {
            console.log("Err" + err);
        });

    }

    //To Create new record and Edit an existing Record.  
    $scope.save = function () {
        var Media = {
            MediaName: $scope.MediaName
        };
        if ($scope.OperType === 1) {
            var promisePost = mediaService.put(id, Media);
            promisePost.then(function (pl) {
                $scope.MediaID = pl.data.MediaID;
                $scope.Message = "Media Added Successfuly";
                GetAllRecords();
               ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        } else {
            //Edit the record                
            Media.MediaID = $scope.MediaID;
            var promisePut = mediaService.put($scope.MediaID, Media);
            promisePut.then(function (pl) {
                $scope.Message = "Media edited Successfuly";
                GetAllRecords();
                ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }
    };


    $scope.abc = "asdfasdf";
    $scope.uploadFile = function ($files) {
        var fileName = $files[0].name;
        var file = $files;

        Upload.upload({
            //Call api to upload.
           
            url: 'api/Media/' + id,
            //method: "post",
            //data:{updateid:id},
            file: file
            //})
        }).progress(function (evt) {
            // get upload percentage
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function (data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);
            GetAllRecords();
            $scope.Message = "Media Added Successfuly";
        }).error(function (data, status, headers, config) {
            // file failed to upload
            console.log(data);
        });
        //});
    };
}]);