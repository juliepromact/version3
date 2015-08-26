app.service('endusermediaService', function ($http) {

    //Get All Update of a product
    this.getAllMedia = function (UpdateID) {

        var ab = $http.get("/api/Media?id=" + UpdateID);
        return ab;
    }

});
