angular.module('Controlador', ['ngRoute', 'ngError'])

        .config(['$httpProvider', function($httpProvider) {

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            }
        ])

        .controller('HomeController', function($scope) {

           var socket = io.connect('https://socialcine-server-node.herokuapp.com');
           var user;

           if(socket){
                socket.emit('quem_sou', '');
                socket.on('eu_sou' , function(user_id){

                    setInterval(function(){

                      socket.emit('rota', {
                          'rota' : 'default',
                          'user' : user_id
                      });
                        
                    }, 120000);

                  	socket.emit('rota', {
                        'rota' : 'default',
                        'user' : user_id
                    });

                    setInterval(function(){
                      socket.emit('users_online', '');
                    }, 1000);
                    socket.on('users_online', function(obj){
                      $scope.$apply(function() {
                          $scope.users_online = obj;
                      });
                    });

                    socket.on('rota_' + user_id, function(obj){

                    	$scope.$apply(function() {
      				            $scope.programacao_single = jQuery.parseJSON(obj.req);
      				        });

                      var i = 0;
                      var loop = setInterval(function(){

                        if(i == 2){
                          if(obj.req){
                              $('#box-programacao').fadeIn(500);
                              $('#box-load').fadeOut(100);

                              clearInterval(loop);
                          }
                        }

                        i++;
                      }, 1000);  
                    });
                });    

           }else{
                alert('sem conexao com a internet');
           }

           $('#search').focusin(function() {
                $('body,html').animate({scrollTop: 0}, 300);
            });

           init();
            function init() {
                $('#voltarTopo').click(function() {
                    $('body,html').animate({scrollTop: 0}, 300);
                });
            }
        })

        .controller('SingleController', function($scope, $routeParams, $location) {

              var canal = $routeParams.paginaId; 
              var socket = io.connect('https://socialcine-server-node.herokuapp.com');
              var user;

               if(socket){
                    socket.emit('quem_sou', '');
                    socket.on('eu_sou' , function(user_id){

                              setInterval(function(){

                              socket.emit('rota', {
                                  'rota' : 'single',
                                  'user' : user_id,
                                  'single' : canal
                              });
                                
                            }, 120000);

                            socket.emit('rota', {
                                'rota' : 'single',
                                'user' : user_id,
                                'single' : canal
                            });

                            setInterval(function(){
                              socket.emit('users_online', '');
                            }, 1000);
                            socket.on('users_online', function(obj){
                              $scope.$apply(function() {
                                  $scope.users_online = obj;
                              });
                            });

                        socket.on('rota_' + user_id, function(obj){

                            $scope.$apply(function() {
                                $scope.programacao = jQuery.parseJSON(obj.req);
                            });

                            var i = 0;
                           var loop = setInterval(function(){

                              if(i == 2){
                                if(obj.req){
                                    $('#box-programacao').fadeIn(500);
                                    $('#box-load').fadeOut(100);

                                    clearInterval(loop);
                                }
                              }

                              i++;
                            }, 1000); 
                        });
                    });    

               }else{
                    alert('sem conexao com a internet');
               }


            $('#search').focusin(function() {
                $('body,html').animate({scrollTop: 0}, 300);
            });

            $('#onback').click(function(){
              document.location.href = "#/home";
            });

           init();
            function init() {
                $('#voltarTopo').click(function() {
                    $('body,html').animate({scrollTop: 0}, 300);
                });
            }
        });
