app.service('enduserupdateService', function ($http) {

 
    //Get All Update of a product
    this.getAllUpdate = function (ProductID) {

        var ab = $http.get("/api/EndUserUpdate?id=" + ProductID);
        return ab;
    }

    this.addmedia = function (UpdateID) {
        var request = $http({
            method: "get",
            url: "/api/Media/" + UpdateID
        });
        return request;
    }

});
