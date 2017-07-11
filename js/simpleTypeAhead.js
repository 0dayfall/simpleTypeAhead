var typeAhead = angular.module('app', []);

typeAhead.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
});

typeAhead.controller('TypeAheadCtrl', function($scope, dataFactory) {
 $scope.name = '';

  dataFactory.get('any.json').then(function(data) {
    $scope.items = data;
  });


  $scope.onItemSelected = function() {
    console.log('selected = ' + $scope.name);
  };

});

typeAhead.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
      items: '=',
      prompt: '@',
      title: '@',
      subtitle: '@',
      model: '=',
      onSelect: '&amp'
    },
    link: function(scope, elem, attrs) {
    },
    templateUrl: 'template/template.html'
  };
});
