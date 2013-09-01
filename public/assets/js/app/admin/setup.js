define(['require', 'app/helpers/debugger'], function(require, Debugger) {

	var Setup = {};

	Setup.init = function() {
		Debugger.log('Setting up the listeners for the setup guide');
		this.navigation_init();
		this.app_timer_init();
		this.closing_init();
		Debugger.log('Finished');
	};

	// Setup the navigation
	Setup.navigation_init = function() {
		Debugger.log('Setup the navigation listeners');
		var _this = this;

		// Dots
		$('#fb-og-setup-dots a').click(function() {
			var tab = $(this).attr('id');
			var tab_no = tab.replace('fb-og-setup-tab-', '');
			var visible = $('#fb-og-setup .fb-og-setup-box:visible');
			if (visible.attr('id') == 'home-top-'+tab_no) return false;
			_this.show_tab(tab_no);
		});

		// Next and previous tab buttons
		$('#fb-og-setup a.prev_setup').click(function() {
			var id = $(this).attr('id');
			var tab_no = id.replace('prev_setup_', '');
			var new_no = parseInt(tab_no, 10) - 1;
			_this.show_tab(new_no);
		});
		$('#fb-og-setup a.next_setup').click(function() {
			var id = $(this).attr('id');
			var tab_no = id.replace('next_setup_', '');
			var new_no = parseInt(tab_no, 10) + 1;
			_this.show_tab(new_no);
		});

	};

	Setup.app_timer_init = function() {
		Debugger.log('Set up the app id text box timer');
		var _this = this;

		// Dot 2: Save app id once changed
		var typingTimer;                //timer identifier
		var doneTypingInterval = 500;  //time in ms, 5 second for example

		//on keyup, start the countdown
		$('#fb-og-setup input[name=fb_og_app_id]').keyup(function(){
			var input = this;
			typingTimer = setTimeout(function() {
				_this.save_app_id(input);
			}, doneTypingInterval);
		});

		//on keydown, clear the countdown
		$('input[name=fb_og_app_id]').keydown(function(){
			clearTimeout(typingTimer);
		});

	};

	Setup.closing_init = function() {
		Debugger.log('Set up the closing listeners');

		// Disable normal form submit (we're using ajax)
		$('#fb-og-setup form').submit(function() {
			return false;
		});
		
		// Hide setup guide when they click close
		$('a.fb-og-setup-close').click(function() {
			$('#fb-og-setup').fadeOut(function() {
				$('div#fb-og-setup-closed').fadeIn();
				return $.post(_sr_ajax.ajaxurl, {
					action: "_sr_ajax_hook",
					type: "close_setup_guide"
				});
			});
		});
		
		// Restart the setup guide for users
		$('a#fb-og-setup-restart').click(function() {
			$(this).html('Restarting...');
			return $.post(_sr_ajax.ajaxurl, {
				action: "_sr_ajax_hook",
				type: "open_setup_guide"
			}, function() {
				window.location.reload();
			});
		});

	};

	// Fade to a new home tab
	Setup.show_tab = function(tab_no) {
		$('#fb-og-setup-dots a.dot-active').removeClass('dot-active');
		$('#fb-og-setup-dots a#fb-og-setup-tab-'+tab_no).addClass('dot-active');
		$('#fb-og-setup .fb-og-setup-box:visible').fadeOut('medium', function() {
			$('#fb-og-setup #fb-og-setup-box-'+tab_no).fadeIn('medium');
		});
	};

	Setup.save_app_id = function(input) {

		Debugger.log('Saving the app id');
		var app_id = $.trim($(input).val());
		Debugger.log('Value: '+app_id);
		
		//Checks
		var form = $(input).parent('form');
		form.find('label.below').hide();
		if (!isNaN(parseFloat(app_id)) && isFinite(app_id)) {
			Debugger.log('Input is correct, show loading image...');
			form.find('label.saving_label').fadeIn();
		} else {
			Debugger.log('Error with input');
			form.find('label.error_numeric_label').fadeIn();
			return false;
		}

		Debugger.log('Starting ajax request');
		return $.post(_sr_ajax.ajaxurl, {
			action: "_sr_ajax_hook",
			type: "save_app_id",
			app_id: app_id
		}, function(data) {
				if (data == '1') {

					// Hide labels
					form.find('label.below').hide();
					form.find('label.saved_label').show().delay(1000).fadeOut();
					
					// Update app id in links
					$("a.fb_og_insert_fb_app_id").each(function() {
						var classes = $(this).attr('class');
						var class_arr = classes.split(' ');
						var location = class_arr[1].replace('fb_og_', '');
						$(this).attr('href', 'https://developers.facebook.com/apps/'+app_id+'/'+location);
					});
					
					// Update input with the app id
					$('input[name=fb_og_app_id]').val(app_id);

				} else {
					console.log(data);
				}


		});
	};




	return Setup;

});
