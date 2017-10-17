/**
 * Defines <ui-hello-world> directive
 */
(function(angular) {
    'use strict';
    angular.module('app').directive('uiHeroForm', function(
    ) {
        return {
            restrict: 'E',
            templateUrl: 'Hero/uiHeroForm.html',
        };
    });
})(angular);
