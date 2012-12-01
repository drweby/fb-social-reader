<div id="fb-og-right">

	<div class="fb-og-admin-box">
		<h3>Need help?</h3>
		<div style="text-align:center;" class="fb-og-inner">
			
			<form id="fb_og_support_form" action="<?php echo bloginfo('url').'/wp-admin/admin.php?page=fb-social-reader-support'; ?>" method="POST" >
				<input type="text" name="fb_og_support_query" value="Type problem here" />
				<input type="submit" value="Search" />
			</form>
			
			<p style="font-weight:bold;">Or visit our <a href="<?php echo bloginfo('url').'/wp-admin/admin.php?page=fb-social-reader-support'; ?>" >support page</a>, or tweet us:</p> 
			<a href="https://twitter.com/intent/tweet?screen_name=FBSocialReader" class="twitter-mention-button" data-size="large" data-related="FBSocialReader">Tweet @FBSocialReader</a>
			<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				
			<br/>
			<br/>
		</div>	
	</div>

	<div class="fb-og-admin-box">
		<h3>Share some love</h3>
		<div style="text-align:center;" class="fb-og-inner">
			<form id="fb_og_feedback_form" action="" method="POST" >
				<input type="hidden" value="<?php echo $current_user->user_email; ?>" name="fb_og_email" />
				<input type="hidden" value="<?php echo $current_user->display_name; ?>" name="fb_og_name" />
				<textarea id="fb_og_feedback_message">Type feedback here</textarea>
				<input type="submit" value="Send Feedback" />
				<label id="feedback_success">Your feedback has been sent. Thanks!</label>
			</form>
			
		</div>	
	</div>


	
</div>