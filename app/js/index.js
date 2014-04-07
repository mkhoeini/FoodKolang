
angular.module('app', ['ui.bootstrap'])

.controller('ctrl', function($scope) {
  var self = this;

  this.orderNumber = +localStorage.orderNumber || 1;

  this.progName = localStorage.progName || 'کلنگ';

  $scope.$watch('ctrl.progName', function (newValue) {
    if (newValue) {
      localStorage.progName = newValue;
    }
  });

  $scope.$watch('ctrl.orderNumber', function (newValue) {
    if (!newValue) return;
    localStorage.orderNumber = newValue;
  });

  global.setFood = function (name, price) {
    self.foods.push({
      name: name,
      price: price,
      count: 1,
      totalPrice: price
    });
  };

  this.totalPrice = 0;

  this.foods = [];

  function calcTotal() {
    var total = 0;
    angular.forEach(self.foods, function (food) {
      total += food.count * food.price;
    });
    return total;
  }

  $scope.$watch(calcTotal, function () {
    angular.forEach(self.foods, function (food) {
      food.totalPrice = food.price * food.count;
    });
  });

  function sumOfTotals () {
    var total = 0;
    angular.forEach(self.foods, function (food) {
      total += +food.totalPrice;
    });
    return total;
  }

  $scope.$watch(sumOfTotals, function (newValue) {
    self.totalPrice = newValue;
  });

  this.moveUp = function(index) {
    var f = self.foods.splice(index, 1)[0];
    self.foods.splice(index - 1, 0, f);
  };

  this.moveDown = function(index) {
    var f = self.foods.splice(index, 1)[0];
    self.foods.splice(index + 1, 0, f);
  };

  this.print = function () {
    window.print();
  };

  this.newFactor = function () {
    self.totalPrice = 0;
    self.foods = [];
    self.orderNumber += 1;
  };
})

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
      input.focus();
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
    restrict: 'A',
    scope: {
      iType: '@',
      myEditable: '='
    },
    template:
      '<span>' +
        '<span id="mye-plain">' +
          '{{myEditable | persian}}' +
        '</span>' +
        '<input class="non-print" type="{{iType}}" ng-model="myEditable">' +
      '</span>',
    link: link
  };
})

.controller('foodsCntl', function ($scope) {
  var self = this;
  this.foods = JSON.parse(localStorage.foods || '[]');

  this.setFood = function (name, price) {
    global.setFood(name, price);
  };

  $scope.$watch('foods.foods', function (newValue) {
    if (!newValue || !newValue.length) return;
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

  this.newFood = function () {
    self.foods.push({});
  };
})
