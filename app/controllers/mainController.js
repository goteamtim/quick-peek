app.controller("mainCtrl", function ($scope, $http) {
    $scope.imageUrl;
    $scope.photosArray = [];
    $scope.currentCountdownTimeElement = document.getElementById("currentCountdownTime");
    $scope.getPhotos = function () {
        $http.get('/getPhotos')
            .then(function (response) {
                photosArray = response.data.photos.photo;

            });
    }

    $scope.buildImageUrl = function(farmId,serverId,id,secret) {
        return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret +'.jpg';
    }

    function displayImage(imageUrl){
        var element = document.querySelector('#main-image');
        element.src = imageUrl;
    }

    function init(){
        $http.get('/getPhotos')
            .then(function (response) {
                $scope.photosArray = response.data.photos.photo;
                var rand = Math.floor(Math.random()*photosArray.length);
                var url = $scope.buildImageUrl(photosArray[rand].farm,photosArray[rand].server,photosArray[rand].id,photosArray[rand].secret);
                //displayImage(url);
                countdownTimer();
            });
    }

    function timeUntilDate(futureDate){
        var now = Date.now();
        return futureDate - now;
    }

    function countdownTimer(){
        var futureDate = localStorage.getItem("futureDate");
        $scope.currentCountdownTimeElement = timeUntilDate(futureDate);
        setTimeout(countdownTimer,1000);
    }

    function displayGrid(photoArray){

    }

    init();
    //setTimeout(,20000)
});