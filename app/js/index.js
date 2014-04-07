
var gui = require('nw.gui');
gui.Window.open('foods.html');

angular.module('app', ['ui.bootstrap'])


.controller('ctrl', function($scope) {
  var self = this;

  this.orderNumber = +localStorage.orderNumber || 1;
  console.log(this.orderNumber);

  this.food = {
    name: 'سفارش',
    count: 1,
    price: 120,
    totalPrice: 120
  };

  $scope.$watch('ctrl.food.count * ctrl.food.price',
                function (newValue) {
                  self.food.totalPrice = newValue;
                });

  $scope.$watch('ctrl.orderNumber', function (newValue) {
    console.log(newValue);
    if (!newValue) return;
    localStorage.orderNumber = newValue;
  });

  global.setFood = function (name, price) {
    self.food.name = name;
    self.food.price = price;
    $scope.$digest();
  };

  this.totalPrice = 100;

  this.foods = [];

  $scope.$watch('ctrl.foods.length', function () {
    var totalPrice = 0;
    angular.forEach(self.foods, function (food) {
      totalPrice += food.totalPrice;
    });
    self.totalPrice = totalPrice;
  });

  this.addFood = function() {
    this.foods.push($.extend({}, this.food));
  };

  this.moveUp = function(index) {
    var f = self.foods.splice(index, 1)[0];
    self.foods.splice(index - 1, 0, f);
  };

  this.moveDown = function(index) {
    var f = self.foods.splice(index, 1)[0];
    self.foods.splice(index + 1, 0, f);
  };

  this.print = function () {
    global.total = self.totalPrice;
    global.foods = self.foods;
    global.orderNumber = self.orderNumber;

    var print_win = gui.Window.open('print.html', {
      window: {show: false}
    });

    self.totalPrice = 0;
    self.foods = [];
    self.orderNumber += 1;
  };
})

.filter('persian', function () {
  return function (str) {
    var numbers = '۰۱۲۳۴۵۶۷۸۹';
    return str.toString().replace(/\d/g, function(n) {
      return numbers[n];
    });
  };
})
