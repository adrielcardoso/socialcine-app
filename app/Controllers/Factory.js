/* Nome do Modulo */
angular.module('Factory', ['ngRoute'])

        /* Configuracao de requisicao HTTP */
        .config(['$httpProvider', function($httpProvider) {

                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $httpProvider.defaults.headers.post = {'Content-Type': 'application/x-www-form-urlencoded'};
            }
        ])

        /* Componente de Resposta */
        .factory('Controle', function($http, $location) {

            return {
                userLogado: function() {
                    if (!window.localStorage.getItem('email') && !window.localStorage.getItem('key')) {
                        document.location.href = 'http://socialcine.tv/#/login';
                    }
                },
                login: function() {

                    var email = $('#email').val();
                    var senha = $('#senha').val();

                    $.ajax({
                        type: 'json',
                        url: 'http://socialcine.tv/api/login/login',
                        data: 'email=' + email + '&senha=' + senha,
                        method: 'post',
                        async: true,
                        success: function(data) {

                            var result = jQuery.parseJSON(data);
                            console.log(result);
                            if (result['retorno']['error'] === 'true') {
                                $('#gifLoad').fadeOut(0);

                                $('#mensagem').fadeIn(300, function() {

                                    $('#ms').html(result['retorno']['mensagem']);

                                    var cont = Number(0);
                                    var sequence = setInterval(function() {

                                        if (cont === 5) {
                                            $('#mensagem').fadeOut(100);
                                            clearInterval(sequence);
                                        }
                                        console.log(cont);
                                        cont++;
                                    }, 1000);
                                });
                                console.log(data);
                            } else {
                                $('#gifLoad').fadeOut(0);

                                window.localStorage.setItem('email', result['retorno']['email']);
                                window.localStorage.setItem('key', result['retorno']['key']);

                                document.location.href = 'http://socialcine.tv/#/home';
                            }
                        }
                    });
                },
                criar: function() {

                    var email = $('#email').val();
                    var email2 = $('#email2').val();
                    var senha = $('#senha').val();
                    var senha2 = $('#senha2').val();

                    $.ajax({
                        type: 'json',
                        url: 'http://socialcine.tv/api/login/criar',
                        data: 'email=' + email + '&email2=' + email2 + '&senha=' + senha + '&senha2=' + senha2,
                        method: 'post',
                        async: true,
                        success: function(data) {

                            var result = jQuery.parseJSON(data);
                            console.log(result);
                            if (result['retorno']['error'] === 'true') {
                                $('#gifLoad').fadeOut(0);

                                $('#mensagem').fadeIn(300, function() {
                                    $('#ms').html(result['retorno']['mensagem']);

                                    var cont = Number(0);
                                    var sequence = setInterval(function() {

                                        if (cont === 5) {
                                            $('#mensagem').fadeOut(100);
                                            clearInterval(sequence);
                                        }
                                        console.log(cont);
                                        cont++;
                                    }, 1000);
                                });
                            } else {
                                $('#gifLoad').fadeOut(0);

                                /* salvando sessao */
                                window.localStorage.setItem('email', result['retorno']['email']);
                                window.localStorage.setItem('key', result['retorno']['key']);

                                document.location.href = 'http://socialcine.tv/#/home';
                            }
                        },
                        error: function(error) {
                            $('#gifLoad').fadeOut(0);
                            alert('Erro no procedimento, tente em 1 minuto...');
                        }
                    });
                },
                scrol: function() {
                    var prim = null;
                    var segu = null;

                    $(document).ready(function() {
                        prim = $(window).scrollTop();
                        $(window).scroll(function() {
                            segu = $(window).scrollTop();
                            if (prim < segu) {
                                $('#book').fadeOut(0);
                                $('#voltarTopo').fadeIn(0);
                                prim = $(window).scrollTop();
                            } else {
                                //alert ("foi para cima");
                                $('#book').fadeIn(0);
                                $('#voltarTopo').fadeOut(0);
                                prim = $(window).scrollTop();
                            }
                        });
                    });

                },
            }
        });