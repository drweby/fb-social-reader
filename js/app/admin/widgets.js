define(['require', 'app/helpers/debugger'], function(require, Debugger) {

	var Widgets = {};

	Widgets.init = function() {
		Debugger.log('Listening for textarea preview click');
		$('.fb_og_widget_code_preview textarea').click(function() {
			$(this).select();
		});
		this.init_sidebar();
		this.init_single();
		Debugger.log('Finished');
	};

	Widgets.init_sidebar = function() {

		Debugger.log('Listening for changes in sidebar fields');

		// Logged in message
		$('input[name=fb_og_login_meta]').keyup(function() {
			var text = $(this).val();
			$('#sr_sidebar_promo').html(text);
		});
		
		// Publishing to Facebook ON
		$('input[name=fb_og_sidebar_publishing_on]').keyup(function() {
			$('.sr_sidebar_toggle').removeClass('sr_sidebar_toggled_off');
			$('.sr_sidebar_toggle').addClass('sr_sidebar_toggled_on');
			$('.sr_sidebar_toggle a').html($(this).val());
		});
		
		// Publishing to Facebok OFF
		$('input[name=fb_og_sidebar_publishing_off]').keyup(function() {
			$('.sr_sidebar_toggle').removeClass('sr_sidebar_toggled_on');
			$('.sr_sidebar_toggle').addClass('sr_sidebar_toggled_off');
			$('.sr_sidebar_toggle a').html($(this).val());
		});
		
		// Your activity
		$('input[name=fb_og_sidebar_activity]').keyup(function() {
			$('#sr_sidebar_activity a').html($(this).val());
		});
		
		// Your activity
		$('input[name=fb_og_login_promo]').keyup(function() {
			$('#sr_sidebar_logged_out p').html($(this).val());
		});

		// Your activity
		$('input[name=fb_og_logout]').keyup(function() {
			$('#sr_sidebar_logout a').html($(this).val());
		});
	
		// Show code
		$('#fb_og_preview_sidebar_code').click(function() {
			var parent = $(this).closest('.fb-og-widget-editor');
			parent.find('.fb_og_widget_code_preview').fadeIn('medium');
		});

	};

	
	Widgets.init_single = function() {

		Debugger.log('Listening for changes in single fields');
		
		// Show code
		$('#fb_og_preview_friends_read_code').click(function() {
			var parent = $(this).closest('.fb-og-widget-editor');
			parent.find('.fb_og_widget_code_preview').fadeIn('medium');
		});	

	};
		

	return Widgets;

});