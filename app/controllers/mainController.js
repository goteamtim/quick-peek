app.controller("mainCtrl", function ($scope, $http) {
    $scope.imageUrl;
    $scope.getPhotos = function () {
        $http.get('/getPhotos')
            .then(function (response) {
                var photoArray = response.photos.photo;
            });
    }

    function buildFlickrUrl(farmId,serverId,id,secret) {
        return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + 'id' + '_' + secret +'}.jpg';
    }
});