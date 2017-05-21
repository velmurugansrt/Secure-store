angular.module('starter.services', [])

.factory('firebaseData',function($firebase){

  var ref = new Firebase("https://password-storage-c50ad.firebaseio.com/accounts");

  return {
    ref : function(){
      return ref;
    }
  }

})

.factory('SignupService',function($rootScope,$state,firebaseData,$firebaseArray){
 
  return {

    dosignup: function(username,email,password){

      


      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(function(authData){        
          var currentUser = authData.uid;
          console.log(currentUser);
          var ref = new Firebase("https://password-storage-c50ad.firebaseio.com/users");
          var signupref= $firebaseArray(ref);
            signupref.$add({
            Uid       :currentUser,
            Username  : username,
            Email     :email,
            Picture:"ben"
          })
          $state.go('login', {}, {location: "replace"});     
        })
     
    }
  }
 
})


.factory('LoginService',function($rootScope,$state){
 
  return {

    dologin: function(email,password){


      firebase.auth().signInWithEmailAndPassword(email, password).then(function(authData){
        var currentUser = authData.uid;
        $rootScope.Uid=$rootScope.currentUser;
        window.localStorage.setItem('authUser',currentUser);
        console.log(currentUser);
         $state.go('tab', {}, {location: "replace"});
      }).catch(function(error){
        if (true) {
          alert('error' + error);
        };
      });
        
      },
      isLoggedIn : function(){
      var thisUser =  window.localStorage.getItem('authUser');
      return thisUser ? true : false;
      }
    }
})

.factory('StoreService',function($rootScope,$state,firebaseData,$firebaseArray){
 
  return {

    dostore: function(accounttype,username,password){
      var ref = new Firebase("https://password-storage-c50ad.firebaseio.com/accounts");
      var todoref= $firebaseArray(ref);
      $rootScope.todolist=todoref;
      $rootScope.uid=window.localStorage.getItem('authUser');
        todoref.$add({
        Uid   :$rootScope.uid,
        Accounttype : accounttype,
        Username : username,
        Pass : password
      })
          $state.go('tab.chats', {}, {location: "replace"});
    }
}
 
})
