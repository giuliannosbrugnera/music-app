function Track($scope, $http) {
  $http.get('http://localhost:65338/api/tracks').
  then(function(response) {
    $scope.data = response;
    console.log(JSON.stringify(response));
  });
}

var musicApp = angular.module('musicApp', ['ui.router']);
musicApp.controller('Track', ['$scope', '$http', Track]);