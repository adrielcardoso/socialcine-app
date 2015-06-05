(function(angular){

    angular.module('ngError', ['ng'])

    .directive('errSrc', function() {
          return {
            link: function(scope, element, attrs) {
              element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                  attrs.$set('src', attrs.errSrc);
                }
              });
            }
          }
        })
    
    .directive('ngError', ['$parse', function($parse){

        return {
            restrict: 'A',
            compile: function($element, attr) {
                var fn = $parse(attr['ngError']);

                return function(scope, element, attr) {
                    element.on('error', function(event) {
                        scope.$apply(function() {
                            fn(scope, {$event:event});
                        });
                    });
                };

            }
        };

    }]);

    
})(angular);