app.service('enduserproductService', function ($http) {

    //Get All Product  
    this.getAllProduct = function () {
        return $http.get("/api/EndUserProduct");
    }

    this.viewupdate = function (ProductID) {
        var request = $http({
            method: "get",
            url: "/api/EndUserUpdate/" + ProductID
        });
        return request;
    }
});