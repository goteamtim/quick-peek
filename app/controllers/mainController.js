app.controller("mainCtrl", function($scope, $http) {
    $scope.getPhoto = function () {
        $http.get('/getPhoto')
        .then(function(response){

        });
    } 
});