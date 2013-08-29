define(function (require) {

  var User      = require("app/models/user");
  // var Analytics = require("app/models/analytics");
  // var Sidebar   = require("app/controllers/sidebar");
  // var Lightbox  = require("app/controllers/lightbox");
  // var Single    = require("app/controllers/single");



  jQuery(function() {

    var user = User;

    user.on("change:profile", function() {
      // Run the sidebar
      // new Sidebar({ model: user });
    });

    user.on("fetch_activity", function() {
      // Run the other stuff
      // new Lightbox({ model: user });
      // new Single({ model: user });
    });

  });


  // replace $() with jquery() - all local
  // $(document).ready(function() {
  //   User.init(function() {
  //     Sidebar.load();
  //   }, function() {
  //     Lightbox.load();
  //     Single.load();
  //     Analytics.init();
  //   });
  // });

});
