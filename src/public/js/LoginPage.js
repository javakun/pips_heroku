var jsonData = [];
var app = angular.module('app', []);
//Angular controller
app.controller('MainController', ['$scope', '$http', function($scope, $http){
//get JSON file form SP library
    $http.get("https://roomfinder.share.gm.com/AIC/Shared%20Documents/roomKeyValues.txt")
//Populate rooms array with JSON
        .success(function(data) {jsonData = data;})
        .then(
        function(){

        });
}]);
function login_click(){
    var usrName = $('#Username').val();
    var usrPass = $('#Password').val();
    alert('username: ' + usrName + '\nPassword: ' + usrPass);
};

