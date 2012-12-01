<?php // The view for the sidebar ?>
<html>
	<head>
	
		<!-- Main stylesheet -->
		<link href='<?php echo FB_OG_PLUGIN_URL; ?>css/style.css' rel='stylesheet' type='text/css' />
		
		<!-- Custom styles added by user -->
		<style type="text/css">
			<?php echo get_option('fb_og_widget_custom_css'); ?>
		</style>
		
		<!-- Load jQuery -->
		<script type='text/javascript' src='<?php echo home_url('/'); ?>wp-includes/js/jquery/jquery.js'></script>
		
		<!-- Needed to make ajax work -->
		<script type='text/javascript'>	
			/* <![CDATA[ */	
			var fb_og_actions = {"ajaxurl":"<?php echo $ajax_url; ?>"};
			/* ]]> */
		</script>
		
		<!-- Json2 needed for older IE -->
		<script type='text/javascript' src='<?php echo home_url('/'); ?>wp-includes/js/json2.js'></script>
		
		<!-- Main javascript file --> 
		<script type="text/javascript" src="<?php echo FB_OG_PLUGIN_URL; ?>js/fb-og-actions.js"></script>
		
		<script type="text/javascript">
		
			// Load facebook javascript SDK on load
			jQuery(document).ready(function(){
			
				window.fbAsyncInit = function() {
				
					// Add this line to make sure that FB.init hasn't run in another plugin before this
					FB.init({
						appId      : '<?php echo $app_id; ?>', // App ID
						channelUrl : '<?php echo FB_OG_PLUGIN_URL; ?>channel.html', // Channel File
						status     : true, // check login status
						cookie     : true, // enable cookies to allow the server to access the session
						xfbml      : true  // parse XFBML
					});

				// Additional initialization: trigger the function that makes the FB OG Actions plugin work
				fb_og_load_friends_who_read_this(<?php echo $_GET['post_id']; ?>);
					
			  };

			  // Load the SDK Asynchronously
			  (function(d){
				 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
				 if (d.getElementById(id)) {return;}
				 js = d.createElement('script'); js.id = id; js.async = true;
				 js.src = "//connect.facebook.net/en_US/all.js";
				 ref.parentNode.insertBefore(js, ref);
			   }(document));
			   
			});

		</script>		
		
	</head>
	<body>
		<div id="fb-root"></div>
		<div id="fb-og-reads"></div>
	</body>
</html>		
<?php 