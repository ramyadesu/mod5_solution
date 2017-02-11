(function () {
'use strict';

angular.module('public')
.component('menuItems', {
  templateUrl: 'src/public/signup/menulist.html',
  bindings: {
    items: '<'
  }
});

})();
