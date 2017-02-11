(function () {
  'use strict';

  angular.module('public')
    .service('InfoService', InfoService);

  InfoService.$inject = [  'SignupService'];

  function InfoService(  SignupService) {
    var service = this;

    var Infoitems = [];



    service.getReg = function () {
      return Regitems;
    };


    service.getMenuP = function (shortName) {

      var sLength = shortName.length;

      var vPath = "";
      for (var i = 0; i < shortName.length; i++) {
        if (shortName.charCodeAt(i) > 64 && shortName.charCodeAt(i) < 91) {
          vPath += shortName.charAt(i);
        }
      }

      return vPath;
      //   myUser.Favorite.substring(0, 1);

    };

  }

})();
