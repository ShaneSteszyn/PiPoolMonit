app.controller('LoginCtrl', ['$mdToast', '$mdDialog', '$rootScope', '$scope', '$location', '$localStorage', 'Auth', 
function($mdToast, $mdDialog, $rootScope, $scope, $location, $localStorage, Auth) {
 
  $scope.user= {
    email: '',
    password: '',
    first: '',
    last: ''
  };

  $scope.signin = function() {
    var formData = {
      email: $scope.user.email,
      password: $scope.user.password
    };

    Auth.signin(formData, function(res) {
      if (res.status === 'failed') {
        $mdToast.show(
          $mdToast.simple().content("Username or password incorrect!")
        );
      } else {
        $localStorage.user = res.user;
        $mdToast.show(
          $mdToast.simple().content("Signed in!")
        );
        $mdDialog.cancel('success');
      }
    }, function() {
      console.log($scope.user.password);
      $mdToast.show(
        $mdToast.simple().content("Failed to sign in!")
      );
    });
  };

  //TODO
  $scope.signup = function() {
    var formData = {
      first: $scope.first,
      last: $scope.last,
      email: $scope.email,
      password: $scope.password
    };

    Auth.save(formData, function(res) {
      if (res.type === false) {
        alert(res.data);
      } else {
        $localStorage.user.token = res.data.token;
        window.location = "/";
      }
    }, function() {
      $rootScope.error = 'Failed to signup';
    });
  };

  //TODO
  $scope.me = function() {
    Auth.me(function(res) {
      $scope.myDetails = res;
    }, function() {
      $rootScope.error = 'Failed to fetch details';
    });
  };

  $scope.logout = function() {
    Auth.logout(function() {
      window.location = "/";
    }, function() {
      alert("Failed to logout!");
    });
  };
  
  $scope.token = $localStorage.token;
}]);
