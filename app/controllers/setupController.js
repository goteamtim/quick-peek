app.controller("setupCtrl", function($scope) {
    $scope.user = {};
    $scope.saveSettings = function(settings){
        localStorage.setItem('quickPeekUserSettings',JSON.stringify(settings));
    };

    loadSettings = function(){
        localStorage.getItem('quickPeekUserSettings',function(value){
            $scope.user = JSON.parse(value);

        });
    };

    loadSettings();
});