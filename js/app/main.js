define(["jquery",
        "./core/user"],
        function ($, User) {

  // replace $() with jquery() - all local
  $(document).ready(function() {
    User.start(function(logged_in) {
      // if (logged_in) {
      //   Widgets(['sidebar', 'lightbox', 'single']);
      //   User.queue_read();
      // } else {
      //   Widgets(['sidebar']);
      // }
    });
  });

});
