/**
 * Defines app as angular module
 */
(function(angular) {
    "use strict";
    angular.module("app", [
        'ngRoute',
        'Templates',
    ])
    .config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: function() {
                console.log("Hello World");
            },
        })
        .otherwise({
            redirectTo: '/'
        });
    });
})(angular);
