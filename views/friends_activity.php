<?php // Shows the articles that you and your friends have recently read on the site ?>

<?php foreach ($reads as $read) { ?>
	<div class="activity-story">
		<a class="name" href="http://facebook.com/profile.php?id=<?php echo $read->fb_id; ?>" target="blank"><img src="https://graph.facebook.com/<?php echo $read->fb_id; ?>/picture" width="35" height="35" alt="<?php echo $read->name; ?>" /></a>
		<div class="activity-title">
			<a class="name" href="http://facebook.com/profile.php?id=<?php echo $read->fb_id; ?>" target="blank"><?php echo $read->name; ?></a> read <a target="_parent" class="article" href="<?php bloginfo('url'); ?>/?p=<?php echo $read->post_id; ?>"><?php echo $read->post_title; ?></a>
		</div>
		<div class="activity-meta">
			<?php echo $read->date_relative; ?>
		</div>
		<div class="clear"></div>
	</div>
<?php } ?>