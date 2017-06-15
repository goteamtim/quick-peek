app.controller("setupCtrl", function($scope) {
    $scope.user =  JSON.parse(localStorage.getItem('quickPeekUserSettings')) || {};
    $scope.saveSettings = function(settings){
        localStorage.setItem('quickPeekUserSettings',JSON.stringify(settings));
    };

});