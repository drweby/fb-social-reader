<div id="fb-og-wrap" class="wrap">
<h2>Settings: <?php echo FB_OG_PUGIN_NAME; ?> - v<?php echo FB_OG_CURRENT_VERSION; ?></h2>

<?php if (isset($error)) { ?><div class="fb-og-notice fb-og-notice-red">Error: <?php echo $error; ?>. Please contact support.</div><?php } ?>
<?php if ($update != false) { ?><div class="fb-og-notice fb-og-notice-yellow">A new update is available! You can download the latest update for free at: <a href="<?php echo $update['download_link']; ?>" target="blank"><?php echo $update['download_link']; ?></a>.</div><?php } ?>


<div id="fb-og-left">

	<?php // Add setup guide at top if not closed
	if (!get_option('fb_og_setup_closed', false)) include('setup-guide.php'); ?>


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
			<span class="description">This plugin loads Facebook meta tags automatically behind the scenes. Check this to disable that (you'll only do this if you're adding them yourself or with another plugin).</span>
		</td>
		</tr>		
		
		<tr valign="top">
		<th scope="row"><a style="font-weight:bold;" id="fb-og-setup-restart">Restart setup guide</a></th>
		
		</tr>		
		
		
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
		
		<tr><td colspan="2"><h3>Custom CSS (advanced users)</h3></td></tr>
		<tr><td colspan="2"><p>For more advanced users, we've added the possibility of adding custom CSS to the widgets, allowing the option of more advanced customization. Enter any CSS you'd like to add below, and see the widgets on the site for any changes:</p></td></tr>
		<tr><td colspan="2"><textarea name="fb_og_widget_custom_css" class="fb_og_custom_css"><?php echo get_option('fb_og_widget_custom_css'); ?></textarea></td></tr>
		
		
	</table>
	<p class="submit"> <input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" /></p>
	</form>
	
	


</div>

<?php include('admin-right.php'); ?>


</div>