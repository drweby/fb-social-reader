define(["jquery",
        "./core/user",
        "./core/widgets/init"],
        function ($, User, Widgets) {

  // replace $() with jquery() - all local
  $(document).ready(function() {
    User.start(function(logged_in) {
      if (logged_in) {
        Widgets(['sidebar', 'lightbox', 'single']);
        User.queue_read();
      } else {
        Widgets(['sidebar']);
      }
    });
  });

});
