<div id="fb-og-wrap" class="wrap">
<h2>Widgets: <?php echo FB_OG_PUGIN_NAME; ?> - v<?php echo FB_OG_CURRENT_VERSION; ?></h2>

<?php if (!empty($errors)) { 
	foreach ($errors as $error) { ?>
		<div class="fb-og-notice fb-og-notice-red">Error: <?php echo $error; ?></div>
	<?php }
} ?>

<div id="fb-og-left">

<div class="fb-og-admin-box">
	<h3>1. Sidebar widget (required for Facebook approval)</h3>
	<div class="fb-og-inner">

		<p>The sidebar widget is the most important widget. It allows users to:</p>
		<ol>
			<li>Sign up to your website</li>
			<li>Enable/disable whether they want to auto-share articles they read on Facebook</li>
			<li>View recent articles they've read</li>
		</ol>
		<br/>
		
		<div class="fb-og-widget-editor">

			<form method="post" action="options.php">
				
				<?php settings_fields( 'fb-og-sidebar-widget-group' ); ?>
				
				<div class="fb-og-widget-editor-row">
				<label>Logged in message</label>
				<input type="text" name="fb_og_login_meta" class="regular-text" value="<?php echo $logged_in; ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Publishing to Facebook (ON)</label>
				<input type="text" name="fb_og_sidebar_publishing_on"  class="regular-text" value="<?php echo $auto_sharing_on; ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Publishing to Facebook (OFF)</label>
				<input type="text" name="fb_og_sidebar_publishing_off"  class="regular-text" value="<?php echo $auto_sharing_off; ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Your latest activity</label>
				<input type="text" name="fb_og_sidebar_activity"  class="regular-text" value="<?php echo $activity; ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Message for non-logged-in users</label>
				<input type="text" name="fb_og_login_promo"  class="regular-text" value="<?php echo $login_promo; ?>" />
				</div>

				<div class="fb-og-widget-editor-row">
				<label>Logout link</label>
				<input type="text" name="fb_og_logout"  class="regular-text" value="<?php echo $logout; ?>" />
				</div>
				
				<input type="submit" class="button-primary" value="<?php _e('Save changes') ?>" />
				<a id="fb_og_preview_sidebar_code" class="preview">Get code</a>
				
				<div class="fb_og_widget_code_preview">
					<p><span style="font-weight:bold;">Go to your <a href="<?php echo get_bloginfo('url'); ?>/wp-admin/widgets.php">widgets page</a></span> and add the widget "FB Social Reader Sidebar" to your sidebar.</p>
					<p><span style="font-weight:bold;">OR</span></p>
					<p>Copy and paste the below to your theme:</p>
					<textarea>&lt;div id=&quot;sr_sidebar_box&quot;&gt;&lt;/div&gt;</textarea>
				</div>
				
			</form>
			
		</div>

		<div class="fb-og-widget-preview">

			<h3>What logged in users see</h3>

			<div id="sr_sidebar_box" style="display: block;">       
				<div id="sr_sidebar_logged_in">               
					<a id="sr_sidebar_img" target="blank" href="https://www.facebook.com/chris.john.houghton">           
						<img src="//graph.facebook.com/578040382/picture" width="50" height="50" alt="Chris Houghton">         
					</a>          
					<div id="sr_sidebar_right">           
						<div id="sr_sidebar_name">
							<a target="blank" href="https://www.facebook.com/chris.john.houghton">Chris Houghton</a>
						</div>            
						<div id="sr_sidebar_promo"><?php echo $logged_in; ?></div>           
						<div id="sr_sidebar_logout"><a><?php echo $logout; ?></a></div>         
					</div>          
					<div class="clear"></div>         
					<div id="sr_sidebar_bottom">            
						<div class="sr_sidebar_toggle sr_sidebar_toggled_on">             
							<a title="Auto sharing to Facebook is enabled"><?php echo $auto_sharing_on; ?></a>            
						</div>            
						<div id="sr_sidebar_activity"><a><?php echo $activity; ?></a></div>         
					</div>        
				</div>      
			</div>

			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			
			<h3>What users who are not logged in see</h3>
			
			<div id="sr_sidebar_box" style="display: block;">       
				<div id="sr_sidebar_logged_out">
					<p><?php echo $login_promo; ?></p>
					<a id="sr_sidebar_login">
						<img src="<?php echo FB_OG_PLUGIN_URL; ?>images/facebooklogin.jpg" width="180" height="40">
					</a>        
				</div>      
			</div>
			
			
		</div>

		<div class="clear"></div>
		
		<br/>
		<br/>
		
	</div>
</div>

<div class="fb-og-admin-box">
	<h3>2. Friends who read this widget</h3>
	<div class="fb-og-inner">

		<p>This widget allows you to show users which of their friends have read an article on your site. We recommend adding it to single article pages, usually above or below the content.</p>
		<br/>
		
		<div class="fb-og-widget-editor">
			
			<form method="post" action="options.php">
				
				<?php settings_fields( 'fb-og-friends-read-this-widget-group' ); ?>
				
				<div class="fb-og-widget-editor-row">
				<label>Automatically add to articles?</label>
				
				
				
				<select name="fb_og_friends_read_auto_add_content">
				<?php $option = get_option('fb_og_friends_read_auto_add_content', '');
					if ($option == '') { ?>
						<option value="">Don't add</option>
						<option value="before">Add before the_content()</option>
						<option value="after">Add after the_content()</option>
					<?php } elseif ($option == 'before') { ?>
						<option value="before">Add before the_content()</option>
						<option value="">Don't add</option>
						<option value="after">Add after the_content()</option>
					<?php } elseif ($option == 'after') { ?>
						<option value="after">Add after the_content()</option>
						<option value="">Don't add</option>
						<option value="before">Add before the_content()</option>
					<?php } ?>
				</select>
				</div>
				
				<input type="submit" class="button-primary" value="<?php _e('Save changes') ?>" />
				
				<a id="fb_og_preview_friends_read_code" class="preview">Get code</a>
				<div class="fb_og_widget_code_preview">
					<p style="font-weight:bold;">Note: You don't need to insert the code if you're automatically adding it above.</p>
					<p>Copy and paste the code to your single.php above or below the_content():</p>
					<textarea>&lt;div id=&quot;sr_friends_single&quot;&gt;&lt;/div&gt;</textarea>
				</div>
				
			</form>
			
		</div>

		<div class="fb-og-widget-preview">
			
			<h3>What logged in users see</h3>
			
				<div id="sr_friends_single" style="display: block;">
					<div class="sr_read_names">
						You, <a target="blank" href="//facebook.com/zuck">Jenna Smith</a> and <a target="blank" href="//facebook.com/zuck">Emily Pankhurst</a> read this
					</div>
					<div class="sr_read_thumbs">
						<a target="blank" href="http://facebook.com/zuck" title="Chris Houghton">
							<img src="//graph.facebook.com/578040382/picture" width="35" height="35" alt="Chris Houghton">
						</a>
						<a target="blank" href="http://facebook.com/zuck" title="Jenna Smith">
							<img src="//graph.facebook.com/509762020/picture" width="35" height="35" alt="Jenna Smith">
						</a>
						<a target="blank" href="http://facebook.com/zuck" title="Emily Pankhurst">
							<img src="//graph.facebook.com/513449780/picture" width="35" height="35" alt="Emily Pankhurst">
						</a>
					</div>
				</div>			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			
			<h3>What users who are not logged in see</h3>
			
			They don't see anything.
			
		</div>

		<div class="clear"></div>
		
		<br/>
		<br/>
		<br/>
		
	</div>
</div>

<div class="fb-og-admin-box">
	<h3>3. Activity widget</h3>
	<div class="fb-og-inner">

		<p>This widget allows you to see what you and your friends have read recently on the site.
		 There are no configuration options for this widget yet, but we'll be adding these soon.</p>
		<p>To see this widget live on your site, click 'activity' in the sidebar widget.</p>
		<br/>
		
		<?php include ('sample-lightbox.php'); ?>


		<div class="clear"></div>
		
		<br/>
		<br/>
		<br/>
		
	</div>
</div>

</div>




<?php include('admin-right.php'); ?>


</div>