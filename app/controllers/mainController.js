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

    $scope.displayRandomImage = function displayRandomImage() {
        var rand = Math.floor(Math.random() * $scope.photosArray.length);
        var imageUrl = $scope.buildImageUrl($scope.photosArray[rand].farm, $scope.photosArray[rand].server, $scope.photosArray[rand].id, $scope.photosArray[rand].secret);
        displayImage(imageUrl);
    }

    $scope.buildImageUrl = function (farmId, serverId, id, secret) {
        return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';
    }

    function displayImage(imageUrl) {
        var element = document.querySelector('#main-image');
        element.src = imageUrl;
    }

    function init() {
        $http.get('/getPhotos')
            .then(function (response) {
                //Handle for errors here in response
                    $scope.photosArray = response.data.photos.photo;
                    var rand = Math.floor(Math.random() * $scope.photosArray.length);
                    var url = $scope.buildImageUrl($scope.photosArray[rand].farm, $scope.photosArray[rand].server, $scope.photosArray[rand].id, $scope.photosArray[rand].secret);
                    displayImage(url);
                    countdownTimer();

            });
    }

    function timeUntilDate(futureDate) {
        var now = Date.now();
        return futureDate - now;
    }

    function countdownTimer() {
        var futureDate = localStorage.getItem("futureDate");
        $scope.currentCountdownTimeElement = timeUntilDate(futureDate);
        setTimeout(countdownTimer, 1000);
    }

    
    init();
    //setTimeout(,20000)
});