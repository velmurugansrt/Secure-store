angular.module('starter.controllers', [])



.controller('DashCtrl', function($scope, StoreService){

      $scope.store= function(storeData) {

      var accounttype = storeData.accounttype;
      var username = storeData.username;
      var password = storeData.password;

      StoreService.dostore(accounttype,username,password);
      }

})


.controller('signupCtrl', function($scope,$rootScope,SignupService){

$scope.sign= function(signData) {

var username = signData.username;
var email = signData.email;
var password = signData.password;

SignupService.dosignup(username,email,password);


}
})

.controller('loginCtrl', function($scope,LoginService){


$scope.login= function(loginData) {

var email = loginData.email;
var password = loginData.password;

LoginService.dologin(email,password);
}

})


 
.controller('ChatsCtrl',function($state,$scope,$ionicPopup,$firebaseArray,firebaseData) {
 
var ref = new Firebase("https://password-storage-c50ad.firebaseio.com/accounts");
var thisUser =  window.localStorage.getItem('authUser');
$scope.Uid=thisUser;
$scope.stores = $firebaseArray(ref);
$scope.Account=$scope.stores;

 $scope.listCanSwipe = true;

$scope.delete = function(store){
        return $scope.stores.$remove(store);
    }

$scope.view=function(store){

  var Account=store.Accounttype;
  var Pass=store.Pass;
  var Username=store.Username;
  $scope.Username=$scope.Username;
  $ionicPopup.alert({
              title :Account,
              template:"<p><b>Username:</b>"+ Username +"<br><b>Password:</b>" +Pass +"</p>"
          });
}
 $scope.listCanSwipe = true


})

.controller('ChatDetailCtrl', function($scope, $stateParams) {

})

.controller('tabCtrl', function($scope,LoginService) {
  LoginService.isLoggedIn();
})

.controller('AccountCtrl', function($state,$scope,$rootScope,$firebaseArray,firebaseData,LoginService) {

$scope.logout=function(){
  firebase.auth().signOut().then(function(){
      window.localStorage.removeItem('authUser');
      $state.go('login');
  })
  }

var ref = new Firebase("https://password-storage-c50ad.firebaseio.com/users");
var thisUser =  window.localStorage.getItem('authUser');
$scope.Uid=thisUser;
$scope.users= $firebaseArray(ref);

});
