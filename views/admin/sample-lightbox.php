<?php 

	// Create a bunch of random users
	$users = array(
		array(
			'name' => 'Mark Zuckerberg',
			'id' => 4
		),
		array(
			'id' => 578040382,
			'name' => 'Chris Houghton'
		),
		array(
			'id' => 500283591,
			'name' => 'Pete Cashmore'
		)
	);

	// Get a bunch of random posts
	$args = array( 'numberposts' => 10, 'post_status' => 'publish');
	$posts = get_posts( $args );

?>


<div id="sr_lightbox" style="display: block; position:relative; margin:0px; left:0px; top:0px;">
	<div id="sr_lightbox_inner">
		<h3>Recent activity</h3>
		<a id="sr_close_lightbox">Close</a>
		<div id="sr_loading" style="display: none;">
			<img src="http://localhost:8888/wordpress/wp-content/plugins/social-reader//images/ajax-loader.gif" alt="Loading...">
		</div>
		<ul id="sr_activity_tabs" style="display: block;">
			<li id="sr_lightbox_everyone" class="sr_active_tab"><a>Everyone</a></li>
			<li id="sr_lightbox_me"><a>Just you</a></li>
		</ul>
		<div id="sr_reads_list" style="display: block;">
			<ul>
				<?php $i=0; while ($i<20) { 
					$user = $users[rand(0, count($users)-1)];
					$post = $posts[rand(0, count ($posts)-1)];
				?>
					<li class="sr_friend_story"><a class="name" href="//facebook.com/<?php echo $user['id']; ?>" target="blank"><img class="story-img" src="https://graph.facebook.com/<?php echo $user['id']; ?>/picture" width="50" height="50" alt="<?php echo $user['name']; ?>"></a>
					<div class="story-inner">
						<div class="story-title">
							<a class="name" href="//facebook.com/profile.php?id=<?php echo $user['id']; ?>" target="blank"> <?php echo $user['name']; ?> </a> read <a class="article" href="<?php echo $post->guid; ?>" target="blank"><?php echo $post->post_title; ?></a>
						</div>
						<div class="story-meta">
							 8 days ago <span>· <a class="sr_story_delete">Delete</a></span>
						</div>
					</div>
					<div class="sr_clear">
					</div>
					</li>
				<?php $i++; } ?>

			</ul>
		</div>
	</div>
</div>

