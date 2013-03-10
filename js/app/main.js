define(["jquery",
        "./core/user",
        "./core/widgets/sidebar/sidebar"],
        function ($, User, Sidebar) {

  // replace $() with jquery() - all local
  $(document).ready(function() {
    User.start(function(logged_in) {
      new Sidebar();
      // if (logged_in) {
      //   Widgets(['sidebar', 'lightbox', 'single']);
      //   User.queue_read();
      // } else {
      //   Widgets(['sidebar']);
      // }
    });
  });

});
