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
      scope.handleSelection = function(selectedItem) {
        scope.model = selectedItem;
        scope.current = 0;
        scope.selected = true;
        $timeout(function() {
          scope.onSelect();
        }, 200);
      };
      scope.current = 0;
      scope.selected = true; // hides the list initially
      scope.isCurrent = function(index) {
        return scope.current == index;
      };
      scope.setCurrent = function(index) {
        scope.current = index;
      };
    },
    templateUrl: 'template/template.html'
  };
});
