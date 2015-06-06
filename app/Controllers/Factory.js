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
                calcula_porcentagem: function(start, stop) {


                        var iniciano_hora = start.substr(8, 2);
                        var iniciano_minuto = start.substr(10, 2);

                        var fim_hora = stop.substr(8, 2);
                        var fim_minuto = stop.substr(10, 2);

                        var d = new Date();
                        var tempo = d.getHours() + d.getMinutes();


                        var tempo_estimado = eval(((fim_hora + fim_minuto) - (iniciano_hora + iniciano_minuto)));

                        var tem_para_terminar = ((fim_hora + fim_minuto) - tempo);

                        if(tempo_estimado > tem_para_terminar){
                            var tempoquepassou = (tempo_estimado - tem_para_terminar);
                        }else{
                            var tempoquepassou = (tem_para_terminar - tempo_estimado);
                        }

                        var porcentagem = eval(((100 * tempoquepassou) / tempo_estimado));

                        if(porcentagem < 0){
                            porcentagem = porcentagem.replace('-', '');
                        }    

                        return (porcentagem > 100 ? 100 : porcentagem);
                }
                
            }
        });