(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$filter', '$q', 'SignupService'];

    function SignupController($filter, $q, SignupService) {
        // var $ctrl =this;
        var reg = this;
        reg.matched = false;
        reg.submit = function () {
            reg.completed = true;
            reg.matched = true;
            reg.addReg();
        };
        reg.favoritechose ='Please select your favorite Dish !';

        reg.addReg = function () {
            SignupService.addRegItem(
                reg.user.firstname,
                reg.user.lastname,
                reg.user.email,
                reg.user.phone,
                reg.user.favoritedish);
        };


        reg.search = function () {
            var upCase = $filter('uppercase');
            var searchText = upCase(reg.user.favoritedish);
         //    reg.favoritechose ='My favorite Dish is' + searchText;
        //     console.log(searchText);


            var promise = SignupService.getMenuList();
            promise.then(function (response) {
                    reg.items = SignupService.getSearchList(response.data, searchText);
                    reg.matched = false;
                //    console.log( reg.items[0])
                     reg.favoritechose =' is my favorite Dish ' + reg.items[0].name ;
               })

                .catch(function (error) {
                    reg.favoritechose =' -- No such menu item exist in my restaurant  !';
                    reg.matched = true;
                });
        };

    }
})();
