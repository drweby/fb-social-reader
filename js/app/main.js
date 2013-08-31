define(function (require) {


  var Global   = require("./global");
  var Facebook = require("./modules/facebook/facebook");

  // var Analytics = require("app/models/analytics");
  var Sidebar   = require("./modules/sidebar/sidebar");
  // var Lightbox  = require("app/controllers/lightbox");
  // var Single    = require("app/controllers/single");



  jQuery(function() {

    var fb = new Facebook(Global.pick("appId", "channelUrl", "sdkDisabled"));

    // The three view modules
    var sidebar     = new Sidebar({ facebook: fb, global: Global });
    var singleReads = new SingleReads({ facebook: fb });
    var lightbox    = new Lightbox({ facebook: fb });

    fb.on("fetch_user", function() {
      sidebar.render();
    });

    fb.on("fetch_activity", function() {
      singleReads.render();
      
    });

    sidebar.on("activity_click", function() {
      // lightbox.render();
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
