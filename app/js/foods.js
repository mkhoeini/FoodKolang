
angular.module('foods', [])

.filter('persian', function () {
  return function (str) {
    var numbers = '۰۱۲۳۴۵۶۷۸۹';
    return (str || '').toString().replace(/\d/g, function(n) {
      return numbers[n];
    });
  };
})

.directive('myEditable', function () {
  function link(scope, elem, attrs) {
    var span = elem.find('#mye-plain'),
        input = elem.find('input');

    span.click(function () {
      span.hide();
      input.show();
    });

    input.blur(function () {
      span.show();
      input.hide();
    });

    input.hide();

    scope.$watch('myEditable', function (newValue) {
      if((newValue || '').toString() === '') {
        scope.myEditable = '-';
      }
    });
  }

  return {
    restrict: '',
    scope: {
      iType: '@',
      myEditable: '='
    },
    template:
      '<span>' +
        '<span id="mye-plain">' +
          '{{myEditable | persian}}' +
        '</span>' +
        '<input type="{{iType}}" ng-model="myEditable">' +
      '</span>',
    link: link
  };
})

.controller('ctrl', function ($scope) {
  var self = this;
  this.foods = JSON.parse(localStorage.foods || '[]');

  this.setFood = function (name, price) {
    global.setFood(name, price);
  };

  $scope.$watch('ctrl.foods', function (newValue) {
    localStorage.foods = JSON.stringify(newValue);
  }, true);

  this.moveUp = function(index) {
    var f = self.foods.splice(index, 1)[0];
    self.foods.splice(index - 1, 0, f);
  };

  this.moveDown = function(index) {
    var f = self.foods.splice(index, 1)[0];
    self.foods.splice(index + 1, 0, f);
  };

})
