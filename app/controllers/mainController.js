app.controller("mainCtrl", function ($scope, $http, $timeout) {
    $scope.imageUrl;
    $scope.imageTitle = "Loading...";
    $scope.userSettings = localStorage.getItem("quickPeekUserSettings") || {};
    $scope.photosArray = [];
    $scope.timeLeft = {};
    $scope.getPhotos = function () {
        $http.get('/getPhotos')
            .then(function (response) {
                photosArray = response.data.photos.photo;

            });
    }

    $scope.displayRandomImage = function displayRandomImage() {
        var rand = Math.floor(Math.random() * $scope.photosArray.length);
        var imageUrl = $scope.buildImageUrl($scope.photosArray[rand].farm, $scope.photosArray[rand].server, $scope.photosArray[rand].id, $scope.photosArray[rand].secret);
        displayImage(imageUrl,$scope.photosArray[rand].title);
    }

    $scope.buildImageUrl = function (farmId, serverId, id, secret) {
        return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';
    }

    function displayImage(imageUrl,title) {
        $scope.imageTitle = title;
        var element = document.querySelector('#main-image');
        element.src = imageUrl;
    }

    function init() {
        $http.get('/getPhotos')
            .then(function (response) {
                //Handle for errors here in response
                    $scope.photosArray = response.data.photos.photo;
                    console.log(response.data)
                    var rand = Math.floor(Math.random() * $scope.photosArray.length);
                    var url = $scope.buildImageUrl($scope.photosArray[rand].farm, $scope.photosArray[rand].server, $scope.photosArray[rand].id, $scope.photosArray[rand].secret);
                    displayImage(url,$scope.photosArray[rand].title);
                    updateCountdownTime();

            });
    }

    function breakdownTimeUntilDate(futureDate) {
        var now = Date.now();
        $scope.timeLeft.totalTime = new Date(new Date(futureDate) - now).getTime();
        $scope.timeLeft.daysLeft = Math.floor($scope.timeLeft.totalTime / (1000 * 60 * 60 * 24));
        $scope.timeLeft.hoursLeft = Math.floor(($scope.timeLeft.totalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        $scope.timeLeft.minutesLeft = Math.floor(($scope.timeLeft.totalTime % (1000 * 60 * 60)) / (1000 * 60));
        $scope.timeLeft.secondsLeft = Math.floor(($scope.timeLeft.totalTime % (1000 * 60)) / 1000);
    }

    function updateCountdownTime() {
        var destinationDate = JSON.parse(localStorage.getItem("quickPeekUserSettings")).endDate || {};
        breakdownTimeUntilDate(destinationDate);
        $timeout(updateCountdownTime, 1000);
    }

    
    init();
});