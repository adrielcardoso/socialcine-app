<html>
    <head>
        <title>SocialCine.Tv</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="icon" href="http://socialcine.tv/favicon.ico" type="image/x-icon" />

        <!-- BOOTSTRAP FRAMEWORK CSS -->
        <link type='text/css' href='http://getbootstrap.com/dist/css/bootstrap.min.css' rel='stylesheet' />

        <!-- COMPONETES FRAMEWORK -->
        <script type='text/javascript' src='app/componentes/angular-1.2.9/angular.min.js'></script>
        <script type='text/javascript' src='app/componentes/angular-1.2.9/angular-resource.min.js'></script>
        <script type='text/javascript' src='app/componentes/angular-1.2.9/angular-route.min.js'></script>
        <script type='text/javascript' src='app/componentes/angular-1.2.9/angular-loader.min.js'></script>
        <script type='text/javascript' src='app/componentes/angular-1.2.9/ng-error.js'></script>

        <!-- CONTROLLER -> CUSTOMIZADO -->
        <script type="text/javascript" src="app/Controllers/Rota.js"></script>
        <script type="text/javascript" src="app/Controllers/Controlador.js"></script>
        <script type="text/javascript" src="app/Controllers/Factory.js"></script>

        <!-- jquery -->
        <script type="text/javascript" src="app/componentes/jquery/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="app/componentes/jquery/jquery-migrate-1.2.1.min.js"></script>

        <!--Bootstrap-->
        <script type='text/javascript' src='app/componentes/bootstrap-3.1.1/js/bootstrap.min.js'></script>

        <!-- websocket -->
        <script type="text/javascript" src="socket.io-1.2.1.js"></script>

        <style>
            .hover:hover{
                opacity: 0.8;
                border: 1px solid #1E90FF;
                cursor: pointer;
            }
            body{
                background: #fff;
            }

            a:hover{
                text-decoration: none;
            }
            a{
                color:#696969;
            }
        </style>
    </head>

    <!-- ng-app definicao de MODULO defaut -->
    <body  ng-app='Rota' style="background-image: url('./capa.jpg'); background-repeat: repeat-x; background-attachment: fixed;">

        <!-- definição de views -> tipo include -->
        <div ng-view></div>
    </body>
</html>
