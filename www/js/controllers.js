angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal

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

  
})

.controller('ProductsCtrl', function($scope, $http) {
  console.log(localStorage.getItem( 'token'));

  $http.post('https://rolimapp.com:3000/productos', {transaccion:'generico', tipo:'4'}).then(function(respuesta){
    
    $scope.productos  = respuesta.data.data;
    
  }, function(errorResponse){
    console.log(errorResponse);
  });
  
})

.controller('DetalleCtrl', function($scope, $stateParams, $http,  $window) {
  $http.post('https://rolimapp.com:3000/productos', {transaccion:'generico', tipo:'4'}).then(function(respuesta){
    $scope.existe = false;
    $scope.productos  = respuesta.data.data;

    let productosSelecc = JSON.parse(localStorage.getItem('productosSeleccionados'));     
      var listProductosSelec = new Array();
      listProductosSelec = productosSelecc;

      if(productosSelecc !== null)
      {
          if(productosSelecc.length >= 0)
          {
            let existe = false
            angular.forEach(listProductosSelec, function(obj, key){
                if(Number(obj.id) === Number($stateParams.productid))
                {
                  existe = true;
                }
            });
  
            if(existe)
            {
              $scope.existe = true;
            }
          }
     
      }
      





    angular.forEach($scope.productos, function(value, key){
      
      if(Number(value.id) === Number($stateParams.productid))
      {
        
      
        $scope.producto = value;
      }
      

    });

    $scope.addCar = function()
    {
      let productosSelecc = JSON.parse(localStorage.getItem('productosSeleccionados'));     
      var listProductosSelec = new Array();
      listProductosSelec = productosSelecc;

      if(productosSelecc !== null)
      {
        if(productosSelecc.length === 0)
        {
          listProductosSelec.push($scope.producto);
          localStorage.setItem('productosSeleccionados', JSON.stringify(listProductosSelec) );       

        }else{
          let existe = false
          angular.forEach(listProductosSelec, function(obj, key){
              if(Number(obj.id) === Number($stateParams.productid))
              {
                existe = true;
              }
          });

          if(!existe)
          {
            listProductosSelec.push($scope.producto);
            localStorage.setItem('productosSeleccionados',  JSON.stringify(listProductosSelec));        
          }
        }
      }else{
        listProductosSelec.push($scope.producto);
        localStorage.setItem('productosSeleccionados',  JSON.stringify(listProductosSelec));        
      }

      $window.location.href = '#/app/products'     


    }
    
    
    
  }, function(errorResponse){
    console.log(errorResponse);
  });
  
})

.controller('LoginCtrl', function($scope, $timeout,$http, $window) {

  $scope.loginData = {username:'', password:''};

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
          $window.location.href = '#/app/products'     
          
        }, 1000);
      }
      
    }, function(errorResponse){
      console.log(errorResponse);
    });
    
  };
})


.controller('CarCtrl', function($scope) {
   
  console.log(JSON.parse(localStorage.getItem( 'productosSeleccionados')))
});

