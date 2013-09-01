<div id="fb-og-wrap" class="wrap">
<h2>Settings: <?php echo FB_OG_PUGIN_NAME; ?> - v<?php echo FB_OG_CURRENT_VERSION; ?></h2>


<?php if (!empty($errors)) { 
	foreach ($errors as $error) { ?>
		<div class="fb-og-notice fb-og-notice-red">Error: <?php echo $error; ?></div>
	<?php }
} ?>



<div id="fb-og-left">

	<?php // Add setup guide at top if not closed
	if (!get_option('fb_og_setup_closed', false)) include('setup-guide.php'); ?>


	<div class="fb-og-admin-box">
		<h3>Settings</h3>
		<div class="fb-og-inner">


		<form method="post" action="options.php">
		
		<?php settings_fields( 'fb-og-settings-group' ); ?>
		
		<!-- Need to have all group option inputs in -->
		
		<table class="form-table">
		
			<tr><td><h3>General settings</h3></td></tr>

			<tr valign="top">
			<th scope="row">Facebook App ID</th>
			<td>
				<input type="text" name="fb_og_app_id"  class="regular-text"  value="<?php echo get_option('fb_og_app_id'); ?>" />
			</td>
			</tr>
			
			<tr valign="top">
			<th scope="row">Disable loading Facebook meta tags?</th>
			<td>
				<input type="checkbox" name="fb_og_meta_disable" <?php if (get_option('fb_og_meta_disable')) { ?>checked="checked"<?php } ?> />
				<span class="description">This plugin loads Facebook Meta Tags automatically behind the scenes. Check this to disable that (you'll only do this if you're adding them yourself or with another plugin).</span>
			</td>
			</tr>	

			<tr valign="top">
			<th scope="row">Disable loading Facebook SDK</th>
			<td>
				<input type="checkbox" name="fb_og_sdk_disable" <?php if (get_option('fb_og_sdk_disable')) { ?>checked="checked"<?php } ?> />
				<span class="description">This plugin loads Facebook's JavaScript SDK back-end. If you're already loading this yourself, check this.</span>
			</td>
			</tr>		

			<tr valign="top">
			<th scope="row">Disable usage tracking</th>
			<td>
				<input type="checkbox" name="fb_og_analytics_disable" <?php if (get_option('fb_og_analytics_disable')) { ?>checked="checked"<?php } ?> />
				<span class="description">We track how your readers use Social Reader on your site so we know what to improve on. Check to disable this.</span>
			</td>
			</tr>					

			<?php // Restart setup guide link
			if (get_option('fb_og_setup_closed', false)) { ?>
				<tr valign="top">
				<th scope="row"><a style="font-weight:bold;" id="fb-og-setup-restart">Restart setup guide</a></th>
				</tr>	
			<?php } ?>
		

				
			
			
			<tr><td><h3>Custom post types</h3></td></tr>
			
			<tr><td colspan="2"><p>By default reads are enabled for "posts". If you wish to enable reads for other post types, check the appropriate boxes.</p></td></tr>
			
			<?php foreach ($custom_posts as $type) { ?>
				<tr valign="top">
				<th scope="row"><?php echo ucfirst($type); ?></th>
				<td>
					<?php if ($type == 'post') { ?>
						<input type="checkbox" name="fb_og_custom_<?php echo $type; ?>" <?php if (get_option('fb_og_custom_'.$type, true)) { ?>checked="checked"<?php } ?> />
					<?php } else { ?>
						<input type="checkbox" name="fb_og_custom_<?php echo $type; ?>" <?php if (get_option('fb_og_custom_'.$type, false)) { ?>checked="checked"<?php } ?> />
					<?php } ?>
				</td>
				</tr>
			<?php } ?>

			<tr><td><h3>Custom CSS</h3></td></tr>

			<tr><td colspan="2"><p>If you'd like to customize the layout and design of the widgets, please enter your CSS code below:</p></td></tr>

			<tr><td colspan="2"><textarea class='fb_og_custom' name='fb_og_custom_css'><?php echo get_option('fb_og_custom_css'); ?></textarea></td></tr>

			
		</table>
		<p class="submit"> <input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" /></p>
		</form>
		
		
			
		</div>
	</div>



</div>

<?php include('admin-right.php'); ?>


</div>