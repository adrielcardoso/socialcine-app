var app = angular.module('Rota', ['ngRoute', 'ngResource', 'Controlador']);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider.
            
            /* Single Cinema */
            when('/', {
                templateUrl: 'app/view/home.html',
                controller: 'HomeController'
            }).
            when('/home', {
                templateUrl: 'app/view/home.html',
                controller: 'HomeController'
            }).
            when('/programacao-de-canais-online/:paginaId', {
                templateUrl: 'app/view/single.html',
                controller: 'SingleController'
            })

            .otherwise({redirectTo : '/home'})
});