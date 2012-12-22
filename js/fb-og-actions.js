// The javascript file for the Facebook Open Graph Actions Plugin


// Declare global variables
var fb_og_is_logged_in;			// true/false
var fb_og_user;					// javascript object



/*
	Put the info in the sidebar. Shows user info if logged in, shows a login button if not.
*/
function fb_og_load_sidebar() {	

	// Add the user if not already, unless user limit has been reached
	FB.getLoginStatus(function(response) {
		
		// Set global
		fb_og_is_logged_in = true;
		
		// If we're connected
		if (response.status === 'connected') {			
					
			FB.api('/me', function(me) {
			
				// Set global
				fb_og_user = me;
												
				// If I'm logged in, get the sidebar with user info. If not, show the login button. 
				var dataString = 'action=fb_og_actions_hook&type=get_sidebar&fb_id='+fb_og_user.id+'&fb_name='+fb_og_user.name;
				jQuery.ajax({
					type: "POST",
					url: fb_og_actions.ajaxurl,
					data: dataString,
					cache: false,
					success: function(html){
						jQuery('#fbPublish').html(html);
						jQuery('#fbPublish').fadeIn('medium');	
						parent.fbOgActionsResizeIframe('fb-og-actions-sidebar-iframe', jQuery('#fbPublish').height() + 10);					
					}
				}); 			
			
			});
		
		// If not, show login button, hide full sidebar
		} else {		
			fb_og_is_logged_in = false;
			jQuery('#fbLogin').fadeIn('medium');
		}
	});

	
}


/* 
	Login button. Click to sign up. publish_actions is required.
*/
jQuery('#fbLogin img').live('click', function() {
	jQuery(this).css('opacity', 0.7);
	FB.login(function(response) {
		if (response.authResponse) {
			window.parent.location.reload()
		} 
	},{scope: 'publish_actions'});
});	

/* 
	Logout link. 
*/
jQuery('#fb_logout a').live('click', function() {
	FB.logout(function(response) {
		window.parent.location.reload()
	});
});	


/* 
	Toggle facebook publishing on/off for action publishing. Triggers a function to set this by ajax.
*/
jQuery('#fbToggleOn a.fbPublishing').live('click', function() {
	jQuery('#fbToggleOn').hide();
	jQuery('#fbToggleOff').show();
	fb_og_toggle_publishing(0);
});
jQuery('#fbToggleOff a.fbPublishing').live('click', function() {
	jQuery('#fbToggleOff').hide();
	jQuery('#fbToggleOn').show();
	fb_og_toggle_publishing(1);
});


/*
	Turns publishing actions on/off 
*/
function fb_og_toggle_publishing(bool) {
	var dataString = 'action=fb_og_actions_hook&type=toggle_publishing&fb_id='+fb_og_user.id+'&publishing='+bool;
	jQuery.ajax({
		type: "POST",
		url: fb_og_actions.ajaxurl,
		data: dataString,
		cache: false,
		success: function(html) {
			console.log(html);
		}
	}); 
}


/* 
	Show articles the user has read
*/
jQuery('.fbToggle a.fbToggleActivity').live('click', function() {
	jQuery('#fbRead').show();
	jQuery('#fbRead img.loading').show();
	jQuery('#fbRead .meta').hide();
	jQuery('#fbRead ul').html('');
	
	// Resize the iframe to show loading image 
	parent.fbOgActionsResizeIframe('fb-og-actions-sidebar-iframe', jQuery('#fbPublish').height() + 75);	
		
	// Query the api
	FB.api('/me/news.reads', function(reads) {
		var i = 0;
		var html = '';
		var data = reads.data;	
		while (i < data.length) {
			html += '<li><a id="'+data[i].id+'" class="fbDelete"></a><a class="fbReadItem" href="'+data[i].data.article.url+'" target="_parent">'+data[i].data.article.title+'</a></li>';
			i++;
		}
		jQuery('#fbRead ul').html(html);
		jQuery('#fbRead img.loading').hide();
		
		// Resize the iframe to cope with the new reads
		parent.fbOgActionsResizeIframe('fb-og-actions-sidebar-iframe', jQuery('#fbPublish').height() + jQuery('#fbRead ul').height() + 15);
	});	
});


/* 
	A user deletes an article
*/
jQuery('#fbRead a.fbDelete').live('click', function() {
	
	// Get stuff and fade out
	var id = jQuery(this).attr('id');
	var parent = jQuery(this).closest('li');
	parent.fadeOut('medium', function() {
		parent.remove();
	});
	
	// Run facebook api call to delete. If successful, remove from our database too
	FB.api('/'+id, 'delete', function(response) {		
		if (response == true) {
			var dataString = 'action=fb_og_actions_hook&type=delete_read&action_id='+id;
			console.log(dataString);
			jQuery.ajax({
				type: "POST",
				url: fb_og_actions.ajaxurl,
				data: dataString,
				cache: false,
				success: function(html) {
					console.log(html);
				}
			}); 
		}
	});	
	
});




/*
	Do the "friends who read this" widget - puts the html in the iframe div
*/
function fb_og_load_friends_who_read_this(post_id) {	

	// Add the user if not already, unless user limit has been reached
	FB.getLoginStatus(function(response) {
		
		// Set global
		fb_og_is_logged_in = true;
		
		// If we're connected
		if (response.status === 'connected') {			
					
			// Get you
			FB.api('/me', function(me) {
			
				// Set global
				fb_og_user = me;
			
				// Get friends
				FB.api('/me/friends', function(fb_og_friends) {						
					
					// Convert the friends and user object array into json to pass into ajax
					var friendsJson = JSON.stringify(fb_og_friends.data);
					
					// Pass me, and friends into the plugin file for processing 
					var dataString = 'action=fb_og_actions_hook&type=get_friends_who_read_this&post_id='+post_id+'&fb_id='+fb_og_user.id+'&fb_name='+fb_og_user.name+'&friends='+friendsJson;
					jQuery.ajax({
						type: "POST",
						url: fb_og_actions.ajaxurl,
						data: dataString,
						success: function(html){
							jQuery('#fb-og-reads').html(html);
							jQuery('#fb-og-loading').hide();
							jQuery('#fb-og-reads').fadeIn('medium');
						}
					}); 
					
				});	
				
			});
		
		} 
	});
	
}


/*
	Do the "friends who read this" widget - puts the html in the iframe div
*/
function fb_og_load_friends_activity() {	

	// Add the user if not already, unless user limit has been reached
	FB.getLoginStatus(function(response) {
		
		// Set global
		fb_og_is_logged_in = true;
		
		// If we're connected
		if (response.status === 'connected') {			
					
			// Get you
			FB.api('/me', function(me) {
			
				// Set global
				fb_og_user = me;
			
				// Get friends
				FB.api('/me/friends', function(fb_og_friends) {						
					
					// Convert the friends and user object array into json to pass into ajax
					var friendsJson = JSON.stringify(fb_og_friends.data);
					
					// Pass me, and friends into the plugin file for processing 
					var dataString = 'action=fb_og_actions_hook&type=get_friends_activity&fb_id='+fb_og_user.id+'&fb_name='+fb_og_user.name+'&friends='+friendsJson;
					jQuery.ajax({
						type: "POST",
						url: fb_og_actions.ajaxurl,
						data: dataString,
						success: function(html){
												
							// Put html
							jQuery('#fb-og-activity').html(html);
							
							// Set the height of the activity div
							var heading_height = jQuery('h3#fb-og-activity-heading').height() + 10;
							var activity_height = jQuery(window).height() - heading_height - 4;
							jQuery('#fb-og-activity').height(activity_height);
							
							// Fade in and setup scrolling
							jQuery('#fb-og-activity').fadeIn('medium', function() {
								jQuery('#fb-og-activity').css('overflow', 'auto');
								jQuery('#fb-og-activity').jScrollPane(); 
							});
							jQuery('h3#fb-og-activity-heading').fadeIn('medium');
							
						}
					}); 
					
				});	
				
			});
		
		} 
	});
	
}


/*
	Do an action. For now the only actions we "do" are reads of articles.
	
	How it works:
		1. If we're not logged in, STOP 
		2. Checks to see if the user has publishing turned on
		3. If they do, send the action call to Facebook (next function)
*/
function fb_og_do_action(permalink, post_id, type) {

	// Stop if not logged in
	if (!fb_og_is_logged_in) return;
	
	// Check the user is logged in and has allowed permission to publish actions before sending the read API call
	var dataString = 'action=fb_og_actions_hook&type=is_publishing&fb_id='+fb_og_user.id;
	jQuery.ajax({
		type: "POST",
		url: fb_og_actions.ajaxurl,
		data: dataString,
		cache: false,
		success: function(html){
			// If we are publishing, send the call to facebook
			if (html == 1) fb_og_send_action_call(permalink, post_id, type);
		}
	}); 


}

/*
	Send an action call to Facebook. If successful, we store it locally.
	
	How it works:
		1. Run some magic to set up the call. (Note there is some stuff below about https which may be taken out in the future)
		2. Setup the API call and post it to facebook
		3. If successful the action id (response.id) is returned. Take this and store it in our database.
*/
function fb_og_send_action_call(permalink, post_id, type) {
		
	/* 
		The action call. Note that adding the https on the front is very important. For some reason Wordpress' get_permalink() is incredibly resitant to 
		showing https on the front. (UPDATE: It's because of the https plugin) As a result, it has to be added here. (Only the path is inputted). 
		Https at the start is required for the app to work.
	*/
	// Automatically work out whether it's http or https
	var protocol = window.location.protocol;
	
	// Setup the call and post to facebook
	var call = '/me/'+type+'?article='+protocol+'//'+permalink;		
	FB.api(call,'post', function(response) {	
		// If the article is not a duplicate it will return an action id. Store this in our database locally.
		if (response.id) {			
			console.log(response);
			var dataString = 'action=fb_og_actions_hook&type=store_read&fb_id='+fb_og_user.id+'&action_id='+response.id+'&post_id='+post_id;
			jQuery.ajax({
				type: "POST",
				url: fb_og_actions.ajaxurl,
				data: dataString,
				cache: false
			}); 	
		} else if (response.error) {
			console.log(response.error);
		}
	});
}


