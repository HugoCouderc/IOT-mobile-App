.controller('loginController', function ($scope, $ionicModal, localStorageService, $http, $state) { //store the connexion informations in a variable var userData = 'user';

//  $state.go('app.browse');
  console.log($state.current)


  $scope.user = {};
  var loggedIn = false;

  $ionicModal.fromTemplateUrl('new-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.newTaskModal = modal;
  });

  $scope.checkLogin = function () {
        //fetches task from local storage
        if(window.localStorage.getItem('userData'))
        {
          return true;
        }else{
          return false;
        }

 }
//
//  $scope.getUser = function () {
//        //fetches task from local storage
//        if (localStorageService.get(userData)) {
//            return localStorageService.get(userData);
//        }
// }
//
 $scope.createUserData = function (user) {
        //creates a new userData
        window.localStorage.setItem('userData', user);
 }

 $scope.removeUserData = function (index) {
        //removes a task
        console.log('deleted');
        window.localStorage.removeItem('userData');
   }

$scope.login = function (){
  $http.post('http://localhost:1337/auth/signin', {identifier : $scope.user.username, password : $scope.user.password}).then(function (res){
          $scope.response = res.data;
          console.log($scope.checkLogin());
          console.log(res.data.token);
          $scope.createUserData(res.data);
          console.log($scope.checkLogin());
      });

}


})
