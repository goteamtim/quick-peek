app.controller("indexCtrl", function($scope) {
    $scope.endDate = new Date();
    $scope.view = 'main';

    $scope.changeView = function (newView) {
        $scope.view = newView;
    } 
});