app.controller("mainCtrl", function ($scope, $http) {
    $scope.imageUrl;
    $scope.getPhotos = function () {
        $http.get('/getPhotos')
            .then(function (response) {
                var photoArray = response.photos.photo;
            });
    }

    function buildFlickrUrl(farmId,serverId,id,secret) {
        return 'https://farm' + farmId + '}.staticflickr.com/' + serverId + '}/' + 'id' + '_' + secret +'}.jpg';
        /**
         * https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
         */
    }
});