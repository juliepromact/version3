app.service('enduserService', function ($http) {

    //Create new record  
    this.post = function (EndUser) {
        var request = $http({
            method: "post",
            url: "/api/EndUser",
            data: EndUser
        });
        return request;
    }

    //Get All Product  
    this.getAllProduct = function () {
        return $http.get("/api/EndUser");
    }

   });