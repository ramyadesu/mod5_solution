(function(){
    "use strict";

    angular.module('public')
    .controller('InfoController', InfoController);

   InfoController.$inject = ['InfoService','SignupService'];
    function InfoController(InfoService, SignupService){
        // var $ctrl =this;
        var info = this;
        info.user = [];

        var Infoitems = SignupService.getReg();
        var myUser = Infoitems[0];


         try
         {
            info.completed =true;
            info.user.firstname = myUser.FirstName;
            info.user.lastname = myUser.LastName ;
            info.user.email = myUser.Email;
            info.user.phone = myUser.Phone
            info.user.favorite = myUser.Favorite;
            info.user.favoritefoodname = SignupService.getFavoriteName(myUser.Favorite,"Name");
            info.user.favoritefooddescription = SignupService.getFavoriteName(myUser.Favorite,"Description");
            info.user.menucategory =  InfoService.getMenuP(myUser.Favorite) ; // myUser.Favorite.substring(0, 1);
          }
         catch (error) {
             info.completed =false;
            // info.user.favoritefoodname ="No such menu muber";
         //    console.log("some error") ;
         }



    }


})();

 
