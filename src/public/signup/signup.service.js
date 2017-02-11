(function () {
  'use strict';

  angular.module('public')
    .service('SignupService', SignupService);

  SignupService.$inject = ['$http', '$q', '$filter', 'ApiPath'];

  function SignupService($http, $q, $filter, ApiPath) {
    var service = this;

    var Regitems = [];

    //$filter('uppercase') favorite;

    service.addRegItem = function (fName, lName, eMail, phone, favorite) {
      var upCase = $filter('uppercase');
      var itemR = {
        'FirstName': fName,
        'LastName': lName,
        'Email': eMail,
        'Phone': phone,
        'Favorite': upCase(favorite) //$filter('uppercase')(favorite);
      };
      if (Regitems.length < 1) {
        Regitems.push(itemR);
      } else {
        Regitems[0].FirstName = fName;
        Regitems[0].LastName = lName;
        Regitems[0].Email = eMail;
        Regitems[0].Phone = phone;
        Regitems[0].Favorite = upCase(favorite);
      }

    };

    service.getReg = function () {
      return Regitems;
    };



    var items = [];
    service.addItem = function (iName, iShort, iDescription) {
      var item = {
        short_name: iShort,
        name: iName,
        description: iDescription
      }

      items.push(item);
    };


    service.getSearchList = function (rData, searchText) {
      var list = rData.menu_items;
      items = [];
      if (searchText != "") {
        for (var i = 0; i < list.length; i++) {
          var desc = list[i].short_name;
          if (desc.indexOf(searchText) !== -1) {
            service.addItem(list[i].name, list[i].short_name, list[i].description)
          }
        }
      }
      return items;

    };

    service.getFavoriteName = function (favorite, dType) {
      try
      {
         var list = items;
      //   console.log(list);
         if (list.length == 0)
           {
             return "No such menu mumber !";
           }
        for (var i = 0; i < list.length; i++) {
          var desc = list[i].short_name;
          if (desc.indexOf(favorite) !== -1) {
            if (dType == "Name") {
              return    list[i].name;
            } else {
              return list[i].description;
            }

          } else {

            return "No such menu mumber !";
          }
        }
    }catch (error)
      {
         return "No such menu mumber !"; }

    };


    service.getMenuList = function () {
      var response = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
        // params: {
        //   category: shortName
        // }
      });

      return response;
    };


    service.getItems = function (shortName) {
      items = service.getJsonData(shortName)
      var deferred = $q.defer();
      deferred.resolve(items);

      return deferred.promise;
    };


    service.getJsonData = function (sName) {
      var response = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json"),
        params: {
          category: sName
        }
      });

      return response;
    };


  }




})();
