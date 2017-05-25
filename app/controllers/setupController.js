app.controller("setupCtrl", function($scope) {
    $scope.user = {};
    $scope.saveSettings = function(settings){
        localStorage.setItem('quickPeekUserSettings',JSON.stringify(settings));
    }
});