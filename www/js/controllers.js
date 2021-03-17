angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {username:'', password:''};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    let request = {
      transaccion : 'autenticarUsuario',
      datosUsuario : {
        email : $scope.loginData.username,
        password : $scope.loginData.password
      }
    }
    $http.post('https://rolimapp.com:3000/usuarios', request).then(function(respuesta){
      console.log(respuesta)
      if(respuesta.data.codigoRetorno === '0001')
      {
        $timeout(function() {
          localStorage.setItem( 'token',  respuesta.data.token);
          localStorage.setItem( 'email',  respuesta.data.usuario.email);
          localStorage.setItem( 'nombre',  respuesta.data.usuario.nombre);          
          $scope.closeLogin();
        }, 1000);
      }
      
    }, function(errorResponse){
      console.log(errorResponse);
    });
    
  };
})

.controller('ProductsCtrl', function($scope, $http) {
  
  $http.post('https://rolimapp.com:3000/productos', {transaccion:'generico', tipo:'4'}).then(function(respuesta){
    
    $scope.productos  = respuesta.data.data;
    
  }, function(errorResponse){
    console.log(errorResponse);
  });
  
})

.controller('DetalleCtrl', function($scope, $stateParams) {
});
