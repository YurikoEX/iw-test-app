'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('MainCtrl', function ($scope) {
    $scope.data = [];
    $scope.$on('comm:foobar-service:inform:foobar-worker:update', function (event, data) {
      $scope.data.push(data);
    });
  });
