

jQuery(document).ready(function() {
		
	
	// When a preview code textarea is clicked, select all text
	jQuery('.fb_og_widget_code_preview textarea').click(function() {
		jQuery(this).select();
	});
	
	
	/* Sidebar widget editing */

		// Logged in message 
		jQuery('input[name=fb_og_login_meta]').keyup(function() {
			var text = jQuery(this).val();
			jQuery('#fbPublish .meta').html(text);
		});
		
		// Publishing to Facebook ON
		jQuery('input[name=fb_og_sidebar_publishing_on]').keyup(function() {
			var text = jQuery(this).val();
			jQuery('#fbToggleOff').hide();
			jQuery('#fbToggleOn').show();
			jQuery('#fbToggleOn .publishingText').html(text);
		});
		
		// Publishing to Facebook OFF
		jQuery('input[name=fb_og_sidebar_publishing_off]').keyup(function() {
			var text = jQuery(this).val();
			jQuery('#fbToggleOn').hide();
			jQuery('#fbToggleOff').show();
			jQuery('#fbToggleOff .publishingText').html(text);
		});	
		
		// Your activity
		jQuery('input[name=fb_og_sidebar_activity]').keyup(function() {
			var text = jQuery(this).val();
			jQuery('.fbToggleActivity').html(text);
		});
		
		// Your activity
		jQuery('input[name=fb_og_login_promo]').keyup(function() {
			var text = jQuery(this).val();
			jQuery('.loginPromo').html(text);
		});	
	
		// Show code
		jQuery('#fb_og_preview_sidebar_code').click(function() {
			var parent = jQuery(this).closest('.fb-og-widget-editor');
			parent.find('.fb_og_widget_code_preview').fadeIn('medium');
		});	
	
	
	
	/* Friends who read this editing */
		
		// Show/hide faces
		jQuery('input[name=fb_og_friends_read_hide_faces]').change(function() {
			if (jQuery(this).attr('checked') == 'checked') {
				jQuery('.fb-og-read-thumbs').hide();
			} else {
				jQuery('.fb-og-read-thumbs').show();
			}
		});
		
		// Show code
		jQuery('#fb_og_preview_friends_read_code').click(function() {
			var parent = jQuery(this).closest('.fb-og-widget-editor');
			parent.find('.fb_og_widget_code_preview').fadeIn('medium');
		});	

		
	/* Recent friend activity widget */
	
	
		// Show code
		jQuery('#fb_og_preview_activity_code').click(function() {
			var parent = jQuery(this).closest('.fb-og-widget-editor');
			parent.find('.fb_og_widget_code_preview').fadeIn('medium');
		});	
		
		// Hide/show header
		jQuery('input[name=fb_og_friends_activity_hide_header]').change(function() {
			if (jQuery(this).attr('checked') == 'checked') {
				jQuery('h3#fb-og-activity-heading').hide();
				jQuery('#fb-og-activity').css('border-top', '1px solid #aaa');
			} else {
				jQuery('h3#fb-og-activity-heading').show();
				jQuery('#fb-og-activity').css('border-top', 'none');
			}
		});
		
		// Show label when number of reads is changed
		jQuery('input[name=fb_og_friends_activity_read_count]').keyup(function() {
			var row = jQuery(this).parent('.fb-og-widget-editor-row');
			row.find('label.input_below').show();
		});
	
	
	/* Setup guide */
	
		// Fade the home tabs on click
		jQuery('#fb-og-setup-dots a').click(function() {
		
			// Get tab number
			var tab = jQuery(this).attr('id');
			var tab_no = tab.replace('fb-og-setup-tab-', '');
			
			// If already displaying, do nothing
			var visible = jQuery('#fb-og-setup .fb-og-setup-box:visible');
			if (visible.attr('id') == 'home-top-'+tab_no) return false;
			
			// Show the new one
			fb_og_show_setup_tab(tab_no);
			
		});
		
		// Disable normal form submit (we're using ajax)
		jQuery('#fb-og-setup form').submit(function() {
			return false;
		});
		
		// Next and previous tab buttons
		jQuery('#fb-og-setup a.prev_setup').click(function() {
			var id = jQuery(this).attr('id');
			var tab_no = id.replace('prev_setup_', '');
			var new_no = parseInt(tab_no) - 1;
			fb_og_show_setup_tab(new_no);
		});
			jQuery('#fb-og-setup a.next_setup').click(function() {
			var id = jQuery(this).attr('id');
			var tab_no = id.replace('next_setup_', '');
			var new_no = parseInt(tab_no) + 1;
			fb_og_show_setup_tab(new_no);
		});
		
		// Dot 2: Save app id once changed
		var typingTimer;                //timer identifier
		var doneTypingInterval = 500;  //time in ms, 5 second for example
		var fb_og_current_app_id;

		//on keyup, start the countdown
		jQuery('#fb-og-setup input[name=fb_og_app_id]').keyup(function(){
			
			var input = jQuery(this);
			typingTimer = setTimeout(function() {
				
				
				// Get id
				var fb_og_app_id = jQuery.trim(input.val());
				
				// Checks
				var form = input.parent('form');
				form.find('label.below').hide();
				if (!isNaN(parseFloat(fb_og_app_id)) && isFinite(fb_og_app_id)) {
					form.find('label.saving_label').fadeIn();
				} else {
					form.find('label.error_numeric_label').fadeIn();
					return false;
				}
				
				// Save it
				var dataString = 'action=fb_og_actions_hook&type=save_app_id&app_id='+fb_og_app_id;
				jQuery.ajax({
					type: "POST",
					url: fb_og_actions.ajaxurl,
					data: dataString,
					cache: false,
					success: function(html){
					
						// Hide labels
						form.find('label.below').hide();
						form.find('label.saved_label').show().delay(1000).fadeOut();
						
						// Update app id in links
						jQuery("a.fb_og_insert_fb_app_id").each(function() { 
							var classes = jQuery(this).attr('class');
							var class_arr = classes.split(' ');
							var location = class_arr[1].replace('fb_og_', '');
							jQuery(this).attr('href', 'https://developers.facebook.com/apps/'+fb_og_app_id+'/'+location);
						});
						
						// Update input with the app id
						jQuery('input[name=fb_og_app_id]').val(fb_og_app_id);
						
					}
				}); 
				
			}, doneTypingInterval);
		});

		//on keydown, clear the countdown 
		jQuery('input[name=fb_og_app_id]').keydown(function(){
			clearTimeout(typingTimer);
		});

		
		// Hide setup guide when they click close
		jQuery('a.fb-og-setup-close').click(function() {
			jQuery('#fb-og-setup').fadeOut(function() {
				jQuery('div#fb-og-setup-closed').fadeIn();
				var dataString = 'action=fb_og_actions_hook&type=close_setup_guide';
				jQuery.ajax({
					type: "POST",
					url: fb_og_actions.ajaxurl,
					data: dataString,
					cache: false
				}); 
			});
		});
		
		// Restart the setup guide for users
		jQuery('a#fb-og-setup-restart').click(function() {
			jQuery(this).html('Restarting...');
			var dataString = 'action=fb_og_actions_hook&type=open_setup_guide';
			jQuery.ajax({
				type: "POST",
				url: fb_og_actions.ajaxurl,
				data: dataString,
				cache: false,
				success: function() {
					window.location.reload();
				}
			}); 
		});
		
		
	/* The Support form */
		
		// Focus and blur for labels
		jQuery('input[name=fb_og_support_query]').focus(function() {
			if (jQuery(this).val() == 'Type problem here') {
				jQuery(this).val('');
				jQuery(this).css('color', '#333');
			}
		});
		jQuery('input[name=fb_og_support_query]').blur(function() {
			if (jQuery(this).val() == '') {
				jQuery(this).val('Type problem here');
				jQuery(this).css('color', '#777');
			}
		});
		
		
	/* The feedback form */
	
		// Focus and blur labels, and expand box
		jQuery('form#fb_og_feedback_form textarea').focus(function() {
			if (jQuery(this).val() == 'Type feedback here') {
				jQuery(this).val('');
				jQuery(this).css('color', '#333');
				jQuery(this).css('height', '130px');
			}	
		});
		jQuery('form#fb_og_feedback_form textarea').blur(function() {
			if (jQuery(this).val() == '') {
				jQuery(this).val('Type feedback here');
				jQuery(this).css('color', '#777');
				jQuery(this).css('height', '35px');
			}
		});
		
		// Send feedback 
		jQuery('form#fb_og_feedback_form').submit(function() {
		
			// Get values
			var name = jQuery('input[name=fb_og_name]').val();
			var email = jQuery('input[name=fb_og_email]').val();
			var content = jQuery(this).find('textarea').val();
			if (content == 'Type feedback here') return false;
			
			// Change button
			jQuery('form#fb_og_feedback_form input[type=submit]').val('Sending...');
			
			// Send via ajax
			var dataString = 'action=fb_og_actions_hook&type=send_feedback&name='+name+'&email='+email+'&content='+content;
			jQuery.ajax({
				type: "POST",
				url: fb_og_actions.ajaxurl,
				data: dataString,
				cache: false,
				success: function(html) {
					jQuery('form#fb_og_feedback_form input').fadeOut();
					jQuery('form#fb_og_feedback_form textarea').fadeOut(function() {
						jQuery('form#fb_og_feedback_form label#feedback_success').fadeIn();
					});					
				}
			}); 
			return false;
		});

	
});


// Fade to a new home tab
function fb_og_show_setup_tab(tab_no) {
	
	// Change the active dot
	jQuery('#fb-og-setup-dots a.dot-active').removeClass('dot-active');
	jQuery('#fb-og-setup-dots a#fb-og-setup-tab-'+tab_no).addClass('dot-active');

	// Fade out the top and fade in the new
	jQuery('#fb-og-setup .fb-og-setup-box:visible').fadeOut('medium', function() {
		jQuery('#fb-og-setup #fb-og-setup-box-'+tab_no).fadeIn('medium');
	});

}
