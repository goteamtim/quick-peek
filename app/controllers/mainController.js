app.controller("mainCtrl", function ($scope, $http, $timeout) {
    $scope.imageUrl;
    $scope.imageTitle = "Loading...";
    $scope.userSettings = JSON.parse(localStorage.getItem("quickPeekUserSettings")) || {};    
    $scope.photosArray = [];
    $scope.timeLeft = {};
    $scope.weather = [];
    $scope.getPhotos = function () {
        $http.get('/getPhotos')
            .then(function (response) {
                photosArray = response.data.photos.photo;

            });
    };

    $scope.getWeather = function(location){
        //sanitize location
        //
        $http.get('/weather/'+encodeURI(location))
            .then(function (response) {
                if(response.data.statusCode != '200'){
                console.log(response.data.statusCode + ": " + JSON.parse(response.data.body).error);
                }else{
                    //console.log("Call to Photos Response \n ",response)
                //Handle for errors here in response
                    $scope.weather.push(response);
                    displayWeatherIcon($scope.weather[0].data.currently.icon)
                    //console.log($scope.weather);
                }
                

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

    displayWeatherIcon = function(icon){
        var skycons = new Skycons({"color": "navy"});
        skycons.add("weather-icon", icon);
        skycons.play();
    };

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
                    console.log(response.data);
                    var rand = Math.floor(Math.random() * $scope.photosArray.length);
                    var url = $scope.buildImageUrl($scope.photosArray[rand].farm, $scope.photosArray[rand].server, $scope.photosArray[rand].id, $scope.photosArray[rand].secret);
                    displayImage(url,$scope.photosArray[rand].title);
                    updateCountdownTime();

            });
        $scope.getWeather($scope.userSettings.homeWeatherLoc);
    }

    function breakdownTimeUntilDate(futureDate) {
        var now = Date.now();
        $scope.timeLeft.total = new Date(new Date(futureDate) - now).getTime();
        $scope.timeLeft.days = Math.floor($scope.timeLeft.total / (1000 * 60 * 60 * 24));
        $scope.timeLeft.hours = Math.floor(($scope.timeLeft.total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        $scope.timeLeft.minutes = Math.floor(($scope.timeLeft.total % (1000 * 60 * 60)) / (1000 * 60));
        $scope.timeLeft.seconds = Math.floor(($scope.timeLeft.total % (1000 * 60)) / 1000);
    }

    function updateCountdownTime() {
        var destinationDate = $scope.userSettings.endDate || {};
        breakdownTimeUntilDate(destinationDate);
        $timeout(updateCountdownTime, 1000);
    }

    
    init();
});