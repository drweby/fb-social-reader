define([
	'require',
	'app/admin/setup',
	'app/admin/widgets'
	], function (
		require,
		Setup,
		Widgets
	) {

	var $ = window.jQuery;

	// jQuery should be in as a WP dependency already
	$(document).ready(function() {
		var widgets_regex = new RegExp('fb-social-reader-widgets',"gi");
		var setup_regex = new RegExp('fb-social-reader',"gi");
		if (widgets_regex.test(window.location.search)) {
			Widgets.init();
		} else if (setup_regex.test(window.location.search)) {
			Setup.init();
		}
	});

});