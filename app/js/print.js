
angular.module('print', [])

.filter('persian', function () {
  return function (str) {
    var numbers = '۰۱۲۳۴۵۶۷۸۹';
    return str.toString().replace(/\d/g, function(n) {
      return numbers[n];
    });
  };
})

.controller('ctrl', function ($timeout) {
  this.total = global.total;
  this.foods = global.foods;
  this.orderNumber = global.orderNumber;

  $timeout(function () {
    window.print();
    window.close();
  }, 40);
})
