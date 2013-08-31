define(function (require) {


  var Global      = require("./global");
  var Facebook    = require("./modules/facebook/facebook");

  // var Analytics = require("app/models/analytics");
  var Sidebar     = require("./modules/sidebar/sidebar");
  // var Lightbox  = require("app/controllers/lightbox");
  var SingleReads = require("./modules/single-reads/single");



  jQuery(function() {

    var fb = new Facebook(Global.pick("appId", "channelUrl", "sdkDisabled"));

    // The three view modules
    var sidebar     = new Sidebar({ facebook: fb, global: Global });
    var singleReads = new SingleReads({ facebook: fb });
    // var lightbox    = new Lightbox({ facebook: fb });


    // Sidebar init
    fb.user.on("is_logged_in", function() {
      if (this.get("loggedIn") === false) {
        sidebar.render();
      }
    });
    fb.on("fetch_user", function() {
      sidebar.render();
    });

    // Sidebar actions
    sidebar.on("activity_click", function() {
      
    });

    
    fb.on("fetch_activity", function() {
      singleReads.render();
      
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
