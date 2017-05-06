app.controller("mainCtrl", function ($scope, $http) {
    $scope.imageUrl;
    $scope.photosArray = [];
    $scope.getPhotos = function () {
        $http.get('/getPhotos')
            .then(function (response) {
                photosArray = response.data.photos.photo;

            });
    }

    function buildImageUrl(farmId,serverId,id,secret) {
        return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret +'.jpg';
    }

    function displayImage(imageUrl){
        var element = document.querySelector('#main-image');
        element.src = imageUrl;
    }

    function init(){
        $http.get('/getPhotos')
            .then(function (response) {
                photosArray = response.data.photos.photo;
                var rand = Math.floor(Math.random()*photosArray.length);
                var url = buildImageUrl(photosArray[rand].farm,photosArray[rand].server,photosArray[rand].id,photosArray[rand].secret);
                displayImage(url);
            });
    }
    init();

});