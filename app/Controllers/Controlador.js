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

                  console.log(user_id);

                  	socket.emit('rota', {
                        'rota' : 'default',
                        'user' : user_id
                    });

                    socket.on('rota_' + user_id, function(obj){
                    	$scope.$apply(function() {
      				            $scope.programacao = obj.req;
      				        });

                      setInterval(function(){
                        if(obj.req){
                            $('#box-programacao').fadeIn(500);
                            $('#box-load').fadeOut(100);
                        }
                      }, 1500);  
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

                            socket.emit('rota', {
                                'rota' : 'single',
                                'user' : user_id,
                                'single' : canal
                            });

                        socket.on('rota_' + user_id, function(obj){
                            $scope.$apply(function() {
                                $scope.programacao = obj.req;
                            });

                            setInterval(function(){
                              if(obj.req){
                                  $('#box-programacao').fadeIn(500);
                                  $('#box-load').fadeOut(100);
                              }
                            }, 1500); 
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
