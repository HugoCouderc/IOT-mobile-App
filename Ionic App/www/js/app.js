// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


app.controller("rightController",function($scope, $ionicModal, localStorageService, $http, $state){
  $scope.rightList = {};

    var bob = JSON.parse(window.localStorage.getItem('userData'));
    var jwtToken = 'JWT '+ bob.token;
  console.log(jwtToken);

  var req = {
   method: 'POST',
   url: 'http://localhost:1337/api/myCamsRights',
   headers: {
     'Authorization' : jwtToken
   },
   data: { userID : bob.user.id }
  }

  $http(req).then(function(res){console.log(res.data); $scope.rightList = res.data});

  $scope.watchCamera = function (camid) {
        console.log("hello");
        console.log(camid);
        jsoncam = JSON.stringify(camid);
        $state.go('app.watchCamera', {cam: jsoncam} );

    }

})

app.controller("watchController",function($scope, $ionicModal, localStorageService, $http, $state){

  var bob = JSON.parse(window.localStorage.getItem('userData'));
  console.log("/////////////////////");
  var jwtToken = 'JWT '+ bob.token;

  var req = {
   method: 'GET',
   url: 'http://localhost:1337/camera/6',
   headers: {
     'Authorization' : jwtToken
   },
   data: {id : $state.params.cam}
  }

  $http(req).then(function(res){
    $scope.thisCam = res.data;
      console.log("aaaaaaa");
        console.log(res.data);
        console.log($scope.thisCam);
  });

  $scope.rotateCam= function(ngl){
    var req = {
     method: 'POST',
     url: 'http://localhost:1337/api/changeAngle',
     headers: {
       'Authorization' : jwtToken
     },
     data: {id : $scope.thisCam.id, angle: ngl}
    }

    $http(req).then(function(res){
      console.log($scope.response);
    });
  }

})

app.controller("manageController",function($scope, $ionicModal, localStorageService, $http, $state){

    $scope.thisCam = JSON.parse($state.params.cam);

    $scope.userRightList = {};

    $scope.newRight = {};

      var bob = JSON.parse(window.localStorage.getItem('userData'));
      var jwtToken = 'JWT '+ bob.token;

    var req = {
     method: 'POST',
     url: 'http://localhost:1337/api/usersCamRights',
     headers: {
       'Authorization' : jwtToken
     },
     data: { camID : $scope.thisCam.id }
    }
    console.log("==========");
    console.log((7 >>> 0).toString(2));
    console.log("==========");
    $http(req).then(function(res){console.log(res.data); $scope.userRightList = res.data});



    $scope.newRights = function () {
      console.log($scope.newRight);
      var level = 0;
      if($scope.newRight.watch){level += 4}
      if($scope.newRight.rotate){level += 2}
      if($scope.newRight.turn){level += 1}

      var req = {
       method: 'POST',
       url: 'http://localhost:1337/api/newUserRights',
       headers: {
         'Authorization' : jwtToken
       },
       data: {username : $scope.newRight.username, camID : $scope.thisCam.id, permissionlevel: level}
      }

      $http(req).then(function(res){
        console.log($scope.response);
      });

      // $http.post('http://localhost:1337/api/newUserRights', {username : $scope.newRight.username, camID : $scope.thisCam.id, permissionlevel: level}).then(function (res){
      //         $scope.response = res.data;
      //         console.log($scope.response);
      //
      //
      //         $state.go('app.mycams');
      // });
    }
})


app.controller("camController",function($scope, $ionicModal, localStorageService, $http, $state){
  $scope.camList = {};



    var bob = JSON.parse(window.localStorage.getItem('userData'));
    var jwtToken = 'JWT '+ bob.token;
  console.log(jwtToken);

  var req = {
   method: 'POST',
   url: 'http://localhost:1337/api/mycams',
   headers: {
     'Authorization' : jwtToken
   },
   data: { owner : bob.user.id }
  }

  $http(req).then(function(res){console.log(res.data); $scope.camList = res.data});

  $scope.manageRights = function (camid) {
        console.log("hello");
        console.log(camid);
        jsoncam = JSON.stringify(camid);
        $state.go('app.giverights', {cam: jsoncam} );

    }


})

app.controller("disconnectController",function($scope, $ionicModal, localStorageService, $http, $state){

  console.log('deleted');
  localStorage.removeItem('userData');
  $state.go('app.login');

})

app.controller("loginController",function($scope, $ionicModal, localStorageService, $http, $state){

  console.log('deleted');
  localStorage.removeItem('userData');

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
        if(localStorage.getItem('userData'))
        {
          console.log(localStorage.getItem('userData'));
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
        localStorage.setItem('userData', user);
        console.log("dump what was just created");
        localStorage.setItem('userData', JSON.stringify(user));
        var bob = JSON.parse(window.localStorage.getItem('userData'));
        console.log(bob.user);

 }

 $scope.removeUserData = function (index) {
        //removes a task
        console.log('deleted');
        localStorage.removeItem('userData');
        $state.go('app.login');
   }

$scope.login = function (){
  $http.post('http://localhost:1337/auth/signin', {identifier : $scope.user.username, password : $scope.user.password}).then(function (res){
          $scope.response = res.data;

          $scope.createUserData(res.data);

          $state.go('app.mycams');
  });

}

});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginController'
      }
    }
  })

  .state('app.disconnect', {
    url: '/disconnect',
    views: {
      'menuContent': {
        controller: 'disconnectController'
      }
    }
  })

  .state('app.mycams', {
    url: '/mycams',
    views: {
      'menuContent': {
        templateUrl: 'templates/mycams.html',
        controller: 'camController'
      }
    }
  })

  .state('app.myrights', {
    url: '/myrights',
    views: {
      'menuContent': {
        templateUrl: 'templates/myrights.html',
        controller: 'rightController'
      }
    }
  })

  .state('app.giverights', {
    url: '/giverights/:cam',
    views: {
      'menuContent': {
        templateUrl: 'templates/giverights.html',
        controller: 'manageController'
      }
    }
  })

  .state('app.watchCamera', {
    url: '/watchCamera/:cam',
    views: {
      'menuContent': {
        templateUrl: 'templates/watchCamera.html',
        controller: 'watchController'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
