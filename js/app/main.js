define(function (require) {


  var Global   = require("./modules/global/global");
  var Facebook = require("./modules/facebook/facebook");

  // var Analytics = require("app/models/analytics");
  // var Sidebar   = require("app/controllers/sidebar");
  // var Lightbox  = require("app/controllers/lightbox");
  // var Single    = require("app/controllers/single");



  jQuery(function() {

    var fb = new Facebook(Global.pick("appId", "channelUrl", "sdkDisabled"));

    fb.on("fetch_user", function() {
      debugger;
      // new Sidebar({ facebook: fb });
    });

    fb.on("fetch_activity", function() {
      // debugger;
    });

    fb.fetch();

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
