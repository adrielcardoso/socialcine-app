angular.module('Controlador', ['ngRoute', 'ngError'])

        .config(['$httpProvider', function ($httpProvider) {

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            }
        ])

        .controller('HomeController', function ($scope) {

            var socket = io.connect('http://socialcine-server-node.herokuapp.com');
            //var socket = io.connect('http://localhost:3000');
            var user;

            if (socket) {
                socket.emit('quem_sou', '');
                socket.on('eu_sou', function (user_id) {

                    socket.emit('rota', {
                        'rota': 'default',
                        'user': user_id
                    });

                    setInterval(function () {
                        socket.emit('users_online_emit', '');
                    }, 500);
                    socket.on('users_online', function (obj) {
                        $scope.$apply(function () {
                            $scope.users_online = obj;
                        });
                    });

                    socket.on('rota_' + user_id, function (obj) {

                        $scope.$apply(function () {
                            $scope.programacao = jQuery.parseJSON(obj.req);
                        });

                        var i = 0;
                        var loop = setInterval(function () {

                            if (i == 2) {
                                if (obj.req) {
                                    $('#box-programacao').fadeIn(500);
                                    $('#box-load').fadeOut(100);

                                    clearInterval(loop);
                                }
                            }

                            i++;
                        }, 1000);
                    });
                });

            } else {
                alert('sem conexao com a internet');
            }

            $('#search').focusin(function () {
                $('body,html').animate({scrollTop: 0}, 300);
            });

            init();
            function init() {
                $('#voltarTopo').click(function () {
                    $('body,html').animate({scrollTop: 0}, 300);
                });
            }

            var data = setInterval(function () {

                var titulos = $('img');

                $.each(titulos, function (index, value) {

                    if ($(value).data('titulo')) {
                        addTitulo($(value).data('titulo'), $(value));
                    }
                });

            }, 1000);

            var titulos = [];
            function addTitulo(titulo, elem) {

                var tem = false;

                for (single in titulos) {
                    if (titulos[single].original == titulo) {
                        tem = true;
                    }
                }

                if (tem == false) {
                    titulos.push({
                        'original': titulo,
                        'status': false,
                        'elem': elem
                    });
                }
            }


            var permisao = true;
            setInterval(function () {

                for (novidade in titulos) {

                    if (titulos[novidade].status == false && permisao == true) {

                        var movie = titulos[novidade].original;
                        var element = $('*[data-titulo="' + movie + '"]');
                        var texto = $('*[data-texto="' + movie + '"]');
                        var Released = $('*[data-Released="' + movie + '"]');
                        permisao = false;

                        $.ajax({
                            method: 'post',
                            type: 'json',
                            url: "http://www.omdbapi.com/?t=" + movie + "=&r=json&tomatoes=true",
                            async: true,
                            success: function (result) {
                                if (result.Poster && element) {
                                    $(element).attr({
                                        'src': result.Poster,
                                        'class': 'thumbnail'
                                    });
                                }
                                if (result.Actors && texto) {
                                    $(texto).html("<label style='font-size: 10px;'>atores: </label><br/>" + result.Actors);
                                }
                                if (result.Released && Released) {
                                    $(Released).html("<label style='font-size: 10px;'>estreia:</label> <br/>" + result.Released);
                                }
                                permisao = true;
                            }
                        });

                        titulos[novidade].status = true;
                    }
                }

            }, 500);
        })

        .controller('SingleController', function ($scope, $routeParams, $location) {

            var canal = $routeParams.paginaId;
            var socket = io.connect('http://socialcine-server-node.herokuapp.com');
            //var socket = io.connect('http://localhost:3000');
            var user;

            if (socket) {
                socket.emit('quem_sou', '');
                socket.on('eu_sou', function (user_id) {

                    socket.emit('rota', {
                        'rota': 'single',
                        'user': user_id,
                        'single': canal
                    });

                    setInterval(function () {
                        socket.emit('users_online_emit', '');
                    }, 1000);
                    socket.on('users_online', function (obj) {
                        $scope.$apply(function () {
                            $scope.users_online = obj;
                        });
                    });

                    socket.on('rota_' + user_id, function (obj) {

                        $scope.$apply(function () {
                            $scope.programacao_single = jQuery.parseJSON(obj.req);
                        });

                        var i = 0;
                        var loop = setInterval(function () {

                            if (i == 2) {
                                if (obj.req) {
                                    $('#box-programacao').fadeIn(500);
                                    $('#box-load').fadeOut(100);

                                    clearInterval(loop);
                                }
                            }

                            i++;
                        }, 1000);
                    });
                });

            } else {
                alert('sem conexao com a internet');
            }


            $('#search').focusin(function () {
                $('body,html').animate({scrollTop: 0}, 300);
            });

            $('#onback').click(function () {
                document.location.href = "#/home";
            });

            init();
            function init() {
                $('#voltarTopo').click(function () {
                    $('body,html').animate({scrollTop: 0}, 300);
                });
            }


            var data = setInterval(function () {

                var titulos = $('img');

                $.each(titulos, function (index, value) {

                    if ($(value).data('titulo')) {
                        addTitulo($(value).data('titulo'), $(value));
                    }
                });

            }, 1000);

            var titulos = [];
            function addTitulo(titulo, elem) {

                var tem = false;

                for (single in titulos) {
                    if (titulos[single].original == titulo) {
                        tem = true;
                    }
                }

                if (tem == false) {
                    titulos.push({
                        'original': titulo,
                        'status': false,
                        'elem': elem
                    });
                }
            }


            var permisao = true;
            setInterval(function () {

                for (novidade in titulos) {

                    if (titulos[novidade].status == false && permisao == true) {

                        var movie = titulos[novidade].original;
                        var element = $('*[data-titulo="' + movie + '"]');
                        var texto = $('*[data-texto="' + movie + '"]');
                        var Released = $('*[data-texto="' + movie + '"]');
                        permisao = false;

                        $.ajax({
                            method: 'post',
                            type: 'json',
                            url: "http://www.omdbapi.com/?t=" + movie + "=&r=json&tomatoes=true",
                            async: true,
                            success: function (result) {
                                if (result.Poster && element) {
                                    $(element).attr({
                                        'src': result.Poster,
                                        'class': 'thumbnail'
                                    });
                                }
                                if (result.Actors && texto) {
                                    $(texto).html("<label style='font-size: 10px;'>atores: </label><br/>" + result.Actors);
                                }
                                if (result.Released && Released) {
                                    $(Released).html("<label style='font-size: 10px;'>estreia:</label> <br/>" + result.Released);
                                }
                                permisao = true;
                            }
                        });

                        titulos[novidade].status = true;
                    }
                }

            }, 500);
        });
