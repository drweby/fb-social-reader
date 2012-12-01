<div id="fb-og-wrap" class="wrap">
<h2>Widgets: <?php echo FB_OG_PUGIN_NAME; ?> - v<?php echo FB_OG_CURRENT_VERSION; ?></h2>

<?php if (isset($error)) { ?><div class="fb-og-notice fb-og-notice-red">Error: <?php echo $error; ?>. Please contact support.</div><?php } ?>
<?php if ($update != false) { ?><div class="fb-og-notice fb-og-notice-yellow">A new update is available! You can download the latest update for free at: <a href="<?php echo $update['download_link']; ?>" target="blank"><?php echo $update['download_link']; ?></a>.</div><?php } ?>


<div id="fb-og-left">

<div class="fb-og-admin-box">
	<h3>1. Sidebar widget (required)</h3>
	<div class="fb-og-inner">

		<p>The sidebar widget is the most important widget. It allows users to:</p>
		<ol>
			<li>Sign up to your website</li>
			<li>Enable/disable whether they want to auto-share articles they read on Facebook</li>
			<li>See recent articles they've read</li>
			<li>Delete previous reads</li>
		</ol>
		<br/>
		
		<div class="fb-og-widget-editor">
			
			<form method="post" action="options.php">
				
				<?php settings_fields( 'fb-og-sidebar-widget-group' ); ?>
				
				<div class="fb-og-widget-editor-row">
				<label>Logged in message</label>
				<input type="text" name="fb_og_login_meta" class="regular-text" value="<?php echo get_option('fb_og_login_meta', 'You are logged in'); ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Publishing to Facebook (ON)</label>
				<input type="text" name="fb_og_sidebar_publishing_on"  class="regular-text" value="<?php echo get_option('fb_og_sidebar_publishing_on', 'Publishing on'); ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Publishing to Facebook (OFF)</label>
				<input type="text" name="fb_og_sidebar_publishing_off"  class="regular-text" value="<?php echo get_option('fb_og_sidebar_publishing_off', 'Publishing off'); ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Your latest activity</label>
				<input type="text" name="fb_og_sidebar_activity"  class="regular-text" value="<?php echo get_option('fb_og_sidebar_activity', 'Your activity'); ?>" />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Message for non-logged-in users</label>
				<input type="text" name="fb_og_login_promo"  class="regular-text" value="<?php echo get_option('fb_og_login_promo', 'Login with Facebook'); ?>" />
				</div>
				
				<input type="submit" class="button-primary" value="<?php _e('Save changes') ?>" />
				<a id="fb_og_preview_sidebar_code" class="preview button">Get code</a>
				
				<div class="fb_og_widget_code_preview">
					<p><span style="font-weight:bold;">Go to your <a href="<?php echo get_bloginfo('url'); ?>/wp-admin/widgets.php">widgets page</a></span> and add the widget "FB Social Reader Sidebar" to your sidebar.</p>
					<p><span style="font-weight:bold;">OR</span></p>
					<p>Copy and paste the below to your theme:</p>
					<textarea>&lt;?php if (function_exists('fb_og_put_sidebar')) fb_og_put_sidebar(); ?&gt;</textarea>
				</div>
				
			</form>
			
		</div>

		<div class="fb-og-widget-preview">

			<h3>What logged in users see</h3>

			<div id="fbPublish" style="display:block;">
				<img src="https://graph.facebook.com/chris.john.houghton/picture" width="50" height="50" alt="Chris Houghton" />
				<div class="name">
					<a target="blank" href="https://www.facebook.com/chris.john.houghton">Chris Houghton</a>
				</div>
				<span class="meta"><?php echo get_option('fb_og_login_meta', 'You are logged in'); ?></span>

				<div class="clear"></div>

				<div class="fbToggle" id="fbToggleOn">
					<a class="fbPublishing"><span class="icon"></span><span class="publishingText"><?php echo get_option('fb_og_sidebar_publishing_on', 'Publishing on'); ?></span></a> 
					<a class="fbToggleActivity"><?php echo get_option('fb_og_sidebar_activity', 'Your activity'); ?></a>
				</div>
				<div class="fbToggle" id="fbToggleOff" style="display:none;">
					<a class="fbPublishing"><span class="icon"></span><span class="publishingText"><?php echo get_option('fb_og_sidebar_publishing_off', 'Publishing off'); ?></span></a> 
					<a class="fbToggleActivity"><?php echo get_option('fb_og_sidebar_activity', 'Your activity'); ?></a>
				</div>
			</div>
			
			<div id="fbRead">
				<div><img style="display:none;" class="loading" src="<?php echo FB_OG_PLUGIN_URL; ?>images/ajax-loader.gif" alt="Loading..." /></div>
				<ul></ul>
			</div>
			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			
			<h3>What users who are not logged in see</h3>
			
			<div id="fbLogin" style="display:block;">
				<div class="loginPromo"><?php echo get_option('fb_og_login_promo', 'Login with Facebook'); ?></div>
				<img width="180" height="40" src="<?php echo FB_OG_PLUGIN_URL; ?>images/facebooklogin.jpg" />
			</div>
			
			
		</div>

		<div class="clear"></div>
		
		<br/>
		<br/>
		
	</div>
</div>

<div class="fb-og-admin-box">
	<h3>2. Friends who read this widget (pro version only)</h3>
	<div class="fb-og-inner">

		<p>This widget allows you to show users which of their friends have read an article on your site. We recommend adding it to single article pages, usually above or below the content.</p>
		<br/>
		
		<div class="fb-og-widget-editor">
			
			<form method="post" action="options.php">
				
				<?php settings_fields( 'fb-og-friends-read-this-widget-group' ); ?>
			
				<div class="fb-og-widget-editor-row">
				<label>Hide faces?</label>
				<input type="checkbox" name="fb_og_friends_read_hide_faces" <?php if (get_option('fb_og_friends_read_hide_faces', false)) { ?>checked="checked"<?php } ?>  />
				</div>
				
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
				
				<a id="fb_og_preview_friends_read_code" class="preview button">Get code</a>
				<div class="fb_og_widget_code_preview">
					<p style="font-weight:bold;">Note: You don't need to insert the code if you're automatically adding it above.</p>
					<p>Copy and paste the code to your single.php above or below the_content():</p>
					<textarea>&lt;?php if (function_exists('fb_og_put_read_friends')) fb_og_put_read_friends(); ?&gt;</textarea>
				</div>
				
			</form>
			
		</div>

		<div class="fb-og-widget-preview">
			
			<h3>What logged in users see</h3>
			
			<div id="fb-og-reads" style="display:block;"> 
				<div class="fb-og-read-names">
					<a href="#">Chris Houghton</a>,
					<a href="#">John Smith</a>,
					<a href="#">Clive Richards</a>
					and 4 others read this
				</div>
				
				
				<div class="fb-og-read-thumbs" <?php if (get_option('fb_og_friends_read_hide_faces', false)) { ?>style="display:none;"<?php } ?>>
					<a title="" href="#" ><img src="https://graph.facebook.com/chris.john.houghton/picture" width="35" height="35" style="margin-right:0px;" /></a>
					<a title="" href="#" ><img src="https://graph.facebook.com/516171660/picture" width="35" height="35" style="margin-right:0px;" /></a>
					<a title="" href="#" ><img src="https://graph.facebook.com/100000328705580/picture" width="35" height="35" style="margin-right:0px;" /></a>
					<a title="" href="#" ><img src="https://graph.facebook.com/510810960/picture" width="35" height="35" style="margin-right:0px;" /></a>
					<a title="" href="#" ><img src="https://graph.facebook.com/782325483/picture" width="35" height="35" style="margin-right:0px;" /></a>
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
	<h3>3. Friend activity widget (pro version only)</h3>
	<div class="fb-og-inner">

		<p>This widget shows users what their friends have read on your site recently.</p>
		<br/>
		
		<div class="fb-og-widget-editor">
			
			<form method="post" action="options.php">
				
				<?php settings_fields( 'fb-og-friends-activity-widget-group' ); ?>
				
				<div class="fb-og-widget-editor-row">
				<label>Hide header?</label>
				<input type="checkbox" name="fb_og_friends_activity_hide_header" <?php if (get_option('fb_og_friends_activity_hide_header', true)) { ?>checked="checked"<?php } ?> />
				</div>
				
				<div class="fb-og-widget-editor-row">
				<label>Number of reads to show</label>
				<input type="text" name="fb_og_friends_activity_read_count" class="regular-text" value="<?php echo get_option('fb_og_friends_activity_read_count', 20); ?>" />
				<label class="input_below" style="display:none;">Changes here will show on the live site</label>
				</div>
				
				<input type="submit" class="button-primary"  value="Save changes" />
				
				<a id="fb_og_preview_activity_code" class="preview button">Get code</a>
				<div class="fb_og_widget_code_preview">
					<p><span style="font-weight:bold;">Go to your <a href="<?php echo get_bloginfo('url'); ?>/wp-admin/widgets.php">widgets page</a></span> and add the widget "FB Social Reader Friend Activity" to your sidebar.</p>
					<p><span style="font-weight:bold;">OR</span></p>
					<p>Copy and paste the below to your theme:</p>
					<textarea>&lt;?php if (function_exists('fb_og_get_friends_activity')) fb_og_get_friends_activity(); ?&gt;</textarea>
				</div>
				
			</form>
			
		</div>

		<div class="fb-og-widget-preview">
			
			<h3>What logged in users see</h3>
			

	
	

		<h3 id="fb-og-activity-heading" style="<?php if (get_option('fb_og_friends_activity_hide_header', true)) { ?>display:none;<?php } else { ?>display: block;<?php } ?>">Friends' activity</h3>
		<div id="fb-og-activity" style="height: 300px; display:block; <?php if (get_option('fb_og_friends_activity_hide_header', true)) { ?>border-top:1px solid #aaa;<?php } ?>">
			<div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/abs.jpg" width="35" height="35" alt="Abigail Stevens"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Abigail Stevens</a> read <a target="_parent" class="article" href="#">Summer Sun in Egypt</a>
				</div>
				<div class="activity-meta">
					Just now		</div>
				<div class="clear"></div>
			</div><div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/bret.jpg" width="35" height="35" alt="Bret Warren"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Bret Warren</a> read <a target="_parent" class="article" href="#">Adobe Wallpaper contest</a>
				</div>
				<div class="activity-meta">
					5 minutes ago		</div>
				<div class="clear"></div>
			</div><div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/chris.jpg" width="35" height="35" alt="Chris Houghton"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Chris Houghton</a> read <a target="_parent" class="article" href="#">Microsoft Dev Team Sends Flowers to Internet Explorer 6's Funeral</a>
				</div>
				<div class="activity-meta">
					2 hours ago		</div>
				<div class="clear"></div>
			</div><div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/jamie.jpg" width="35" height="35" alt="Jamie Seymour"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Jamie Seymour</a> read <a target="_parent" class="article" href="#">Apple Introduces the new iPad</a>
				</div>
				<div class="activity-meta">
					5 hours ago		</div>
				<div class="clear"></div>
			</div>
			<div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/luke.jpg" width="35" height="35" alt="Luke Smith"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Luke Smith</a> read <a target="_parent" class="article" href="#">Hello world!</a>
				</div>
				<div class="activity-meta">
					Yesterday		</div>
				<div class="clear"></div>
			</div>
			<div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/abs.jpg" width="35" height="35" alt="Abigail Stevens"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Abigail Stevens</a> read <a target="_parent" class="article" href="#">Summer Sun in Egypt</a>
				</div>
				<div class="activity-meta">
					Yesterday		</div>
				<div class="clear"></div>
			</div><div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/bret.jpg" width="35" height="35" alt="Bret Warren"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Bret Warren</a> read <a target="_parent" class="article" href="#">Adobe Wallpaper contest</a>
				</div>
				<div class="activity-meta">
					2 days ago		</div>
				<div class="clear"></div>
			</div><div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/chris.jpg" width="35" height="35" alt="Chris Houghton"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Chris Houghton</a> read <a target="_parent" class="article" href="#">Microsoft Dev Team Sends Flowers to Internet Explorer 6's Funeral</a>
				</div>
				<div class="activity-meta">
					2 days ago		</div>
				<div class="clear"></div>
			</div><div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/jamie.jpg" width="35" height="35" alt="Jamie Seymour"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Jamie Seymour</a> read <a target="_parent" class="article" href="#">Apple Introduces the new iPad</a>
				</div>
				<div class="activity-meta">
					3 days ago		</div>
				<div class="clear"></div>
			</div>
			<div class="activity-story">
				<a class="name" href="#" target="blank"><img src="<?php echo FB_OG_PLUGIN_URL; ?>images/widgetimg/luke.jpg" width="35" height="35" alt="Luke Smith"></a>
				<div class="activity-title">
					<a class="name" href="#" target="blank">Luke Smith</a> read <a target="_parent" class="article" href="#">Hello world!</a>
				</div>
				<div class="activity-meta">
					4 days ago		</div>
				<div class="clear"></div>
			</div>			
		</div>
		
		<script type="text/javascript">
			jQuery(document).ready(function() {
			
				jQuery('#fb-og-activity').jScrollPane(); 
			});
		</script>	
			
		
	
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

</div>

<?php include('admin-right.php'); ?>


</div>