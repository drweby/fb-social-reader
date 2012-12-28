<div id="fb-og-setup">
	
	<div id="fb-og-close-setup-img"><a class="fb-og-setup-close"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/fancy_close.png" /></a></div>
	
	<div id="fb-og-setup-box-1" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-1.png" /></div>
		<div class="fb-og-setup-left">
		<h1>Setup Guide</h1>
		<p>Transform your Wordpress into a social reading experience. With Social Reader, your readers automatically share articles on your site they read to Facebook, and can see what their friends read too.</p>
		<a id="next_setup_1" class="large_button large_button_green next_setup">Click here to begin setup</a>
		</div>
		<div class="clear"></div>
	</div>
	
	<div id="fb-og-setup-box-2" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-2.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>Create your Facebook App</h1>
		<p>First</span> things first, you need to create a Facebook app at <a href="https://developers.facebook.com/apps" target="blank">https://developers.facebook.com/apps</a>. Once you've created it, paste the App ID into the form below.</p>	
		
		<form>
			<label>Facebook App ID</label>
			<input type="text" name="fb_og_app_id" value="<?php echo get_option('fb_og_app_id'); ?>" />
			<div style="height:25px;">
			<label class="below saving_label">Saving...</label>
			<label class="below saved_label">Saved!</label>
			<label class="below error_label error_numeric_label">Your Facebook App ID should be ONLY numbers</label>
			</div>
		</form>	
		<a id="prev_setup_2" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_2" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>
	
	<div id="fb-og-setup-box-3" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-3.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>Create a "read action"</h1>
		<p>Go to <a class="fb_og_insert_fb_app_id fb_og_opengraph" href="https://developers.facebook.com/apps/<?php echo get_option('fb_og_app_id'); ?>/opengraph" target="blank">open graph</a> in your Facebook App settings. Then do the following:</p>
		<ol>
			<li>Create a "read" action (Facebook should autocomplete this for you)</li>
			<li>Create an "article" object (Facebook should autocomplete this for you)</li>
		</ol>
		<p>Once you've created these, you might be given the option to change a few additional options, although normally the defaults are fine.</p>
		<a id="prev_setup_3" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_3" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>
	
	<div id="fb-og-setup-box-4" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-4.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>A quick check...</h1>
		<p>Check you added the action correctly. For "read", click the link "get code", and ensure that "news.reads" appears in the first code box, as shown on the right.</p>	
		<a id="prev_setup_4" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_4" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>
	
	<div id="fb-og-setup-box-5" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-5.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>Some app settings</h1>
		<p>Go to the <a class="fb_og_insert_fb_app_id fb_og_summary" href="https://developers.facebook.com/apps/<?php echo get_option('fb_og_app_id'); ?>/summary" target="blank" >settings</a> of your app page on Facebook and ensure that:</p>
		<ol>
			<li>Your domain is included in "App Domains".</li>
			<li>You have checked the "Website with Facebook Login" box, and added your domain to "Site URL".</li>
		</ol>
		<a id="prev_setup_5" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_5" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>
	
	<div id="fb-og-setup-box-6" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-6.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>More app settings</h1>
		<p>Go to the <a class="fb_og_insert_fb_app_id fb_og_permissions" href="https://developers.facebook.com/apps/<?php echo get_option('fb_og_app_id'); ?>/permissions" target="blank" >permissions page</a> in your Facebook App:</p>
		<ol>
			<li>Enable "Authenticated Referrals"</li>
			<li>Add "publish_actions" to "User &amp; Friend Permissions"</li>
		</ol>
		<a id="prev_setup_6" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_6" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>	
	
	<div id="fb-og-setup-box-7" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-7.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>Adding the widgets</h1>
		<p>Go to the <a href="<?php bloginfo('url'); ?>/wp-admin/admin.php?page=fb-social-reader-widgets" target="blank">widgets page</a> to customize and add the plugin widgets to your theme.</p>
		<p>Once you've added the widgets to your pages, check that they're appearing properly before continuing.</p>
		<a id="prev_setup_7" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_7" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>	
	
	<div id="fb-og-setup-box-8" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-8.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>Testing and finalising</h1>
		<p><span style="font-weight:bold;">We're basically done now! Now you should:</span></p>
		<ol>
			<li>Customize the <a class="fb_og_insert_fb_app_id fb_og_appdetails" href="https://developers.facebook.com/apps/<?php echo get_option('fb_og_app_id'); ?>/appdetails" target="blank" >app details</a> for your application.</li>
			<li>Test your app to make sure it's doing what it should be. Facebook allows you to add others help you test on their <a class="fb_og_insert_fb_app_id fb_og_roles" href="https://developers.facebook.com/apps/<?php echo get_option('fb_og_app_id'); ?>/roles" target="blank" >roles page</a>. When you read an article, it should take 10 seconds of waiting before a read is published to your timeline.</li>
		</ol>
		<p>If you're having difficulty publishing a read to Facebook, see <a href="https://getsatisfaction.com/fbsocialreader/topics/reads_arent_appearing_on_my_facebook_timeline_why_not" target="blank">this support article</a>.</p>
		<a id="prev_setup_8" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a id="next_setup_8" class="large_button large_button_green next_setup">Next step &raquo;</a>
		</div>
		<div class="clear"></div>
	</div>
	
	<div id="fb-og-setup-box-9" class="fb-og-setup-box">
		<div class="fb-og-setup-right"><img class="setup-right" src="<?php echo FB_OG_PLUGIN_URL; ?>images/screenshots/setup-9.png"  /></div>
		<div class="fb-og-setup-left">
		<h1>Submitting to Facebook</h1>
		<p>Facebook has to approve all actions created to stop spammers, so they require you to submit your action for approval to make it public. This can be done by clicking "submit" next to your action on the <a class="fb_og_insert_fb_app_id fb_og_opengraph" href="https://developers.facebook.com/apps/<?php echo get_option('fb_og_app_id'); ?>/opengraph" target="blank" >open graph page</a> of your Facebook app.</p>
		
		<p>To make life easier for you, we've created some easy text for you to copy and paste into the submission box:</p>
		
		
		<textarea style="width:100%;height:150px;">
1. Go to <?php bloginfo('url'); ?> and sign up by clicking the login with Facebook image on the sidebar
2. Click on any article to read it
3. After 10 seconds the read will be automatically posted to your Facebook timeline

To view or delete any reads published, click "<?php echo get_option('fb_og_sidebar_activity', 'Activity'); ?>" on the sidebar. To toggle auto-publishing reads to Facebook, click "<?php echo get_option('fb_og_sidebar_publishing_on', 'Auto-sharing on'); ?>" on the sidebar.
</textarea>
		
		<p>Once they've approved it, you're done! The app will work publicly for all users on your site.</p>
		<a id="prev_setup_9" class="large_button large_button_blue prev_setup">&laquo; Previous step</a>
		<a class="large_button large_button_green fb-og-setup-close">Close Setup Guide</a>
		</div>
		<div class="clear"></div>
	</div>	
	
	<div id="fb-og-setup-dots">
		<a href="#" class="dot dot-active" id="fb-og-setup-tab-1"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-2"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-3"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-4"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-5"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-6"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-7"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-8"></a>
		<a href="#" class="dot" id="fb-og-setup-tab-9"></a>
	</div>
	
</div>

<div id="fb-og-setup-closed" class="fb-og-notice fb-og-notice-yellow">
	You have closed the setup guide. To open the guide again, please click "restart setup guide"</a>.
</div>