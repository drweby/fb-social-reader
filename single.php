<?php
/**
 * The Template for displaying all single posts.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header();
?>

		<div id="container">
		
			<div id="single-main">
			
					<div id="single-left">
						<?php echo adrotate_group(2); ?>				
					</div>
					
					
			
					<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

					<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
											
						<div id="content" role="main">
						
							<div class="entry-meta">
										
										<h1 class="entry-title"><?php the_title(); ?></h1>
										
										<div class="entry-meta-left">
											<?php echo get_avatar(get_the_author_email(), '50', get_bloginfo('template_url')."/images/blank.gif", get_the_author()); ?>
											
											<div class="entry-meta-author"><?php coauthors_posts_links(); ?></div>
											
											<div class="entry-meta-time"><?php the_time("j F Y h:i a") ?> </div>
											
											<div class="entry-meta-comments"><?php comments_popup_link('No Comments', '1 Comment', '% Comments'); ?></div>
										</div>
										
										<div class="entry-meta-right">
											<a href="https://twitter.com/share" class="twitter-share-button" data-text="<?php the_title(); ?>" data-via="sotontab">Tweet</a>
											<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
											
											<div class="clear"></div>

											<div style="text-align:right;" class="fb-like" data-send="false" data-layout="button_count" data-href="<?php the_permalink(); ?>" data-width="50" data-show-faces="false"></div>


											<div class="clear"></div>
										</div>
										
										<div class="clear"></div>
										
							</div><!-- .entry-meta -->
					
							<div class="entry-content">
							
							<?php // This bit is needed to put the Facebook who has read what bit
							fb_og_put_read_friends(); ?>
				
														
							
								<?php the_content(); ?>
								
								<div style="min-height:80px; margin-top:10px;" class="fb-like" data-href="<?php the_permalink(); ?>" data-send="true" data-width="450" data-show-faces="true"></div>

								
								
								<?php if (in_category('Nightlife')) { ?>
									<div class="article-end-notice">
										<i>Have you got any hilarious drunken stories? Happenings that are just too painful NOT to share? 
										Email them anonymously to <a href="mailto:nightlife@sotontab.co.uk">nightlife@sotontab.co.uk</a>! </i>
									</div>
								<?php } elseif (in_category(656)) { ?>
									
								<?php } ?>
								

								
								<?//php related_posts(array('template_file'=>'yarpp-template-single.php')); ?>
								

								<div class="sidebar-box">
									<div class="inner">
										<h3>Get the latest Tab news on Facebook!</h3>
										<p>'Like' us on Facebook and you'll get the top stories in your feed!</p>
										<div style="height:180px; width:415px;" class="fb-like-box" data-href="http://www.facebook.com/sotontab" data-width="415" data-height="180" data-show-faces="true" data-border-color="#fff" data-stream="false" data-header="false"></div>
										<div class="clear"></div>
									</div>
								</div>


							</div><!-- .entry-content -->



					
						

							
							<?php //used to get the author posts outside the loop 
							$author_id=$post->post_author;
							?>

							<?php global $user_ID; if( $user_ID ) : ?>
							<?php if( current_user_can('level_10') ) : ?>
								<?php // comments_template( '/comments-new.php', true ); ?>
							<?php else : ?>
							<?php endif; ?>
							<?php endif; ?>
							
							<?//php global $user_ID; if( $user_ID ) : ?>
							<?//php if( current_user_can('level_10') ) : ?>
								<?//php comments_template( '/comments-new.php', true ); ?>
							<?//php else : ?>
								<?php comments_template( '/comments.php', true ); ?>
							<?//php endif; ?>
							<?//php endif; ?>
							
							
							<?php endwhile; // end of the loop. ?>

						</div><!--  #content: the single post content. This id is not used anywhere apart from single post pages -->
						
					</div><!-- #post-## -->
			</div>
		
			<div id="sidebar">
											
					<div id="facebookBox" class="sidebar-box">
						<div class="inner">
							<div style="height:180px;" class="fb-like-box" data-href="http://www.facebook.com/sotontab" data-width="292" data-height="180" data-show-faces="true" data-border-color="#fff" data-stream="false" data-header="false"></div>
							<?php // Puts the facebook app sidebar html, which then gets modded by jquery with the facebook api
							fb_og_put_login_info(); ?>		
						</div>
					</div>

					<div class="sidebar-box-ad">
						<?php echo adrotate_group(1); ?>		
					</div>
						
					<?//php include('sidebar-polls.php') ?>
					

			<script type="text/javascript">
			$(function() {
				$( "#most-tabs" ).tabs();
			});
			</script>


			<div id="most-tabs">
				<ul id="most-navigation">
					<li><a class="most-tab-left" href="#most-tabs-1">Most read</a></li>
					<li><a class="most-tab-middle" href="#most-tabs-2">Most shared</a></li>
					<li><a class="most-tab-right" href="#most-tabs-3">Most commented</a></li>
				</ul>
				<div class="most-tab" id="most-tabs-1">
					<ul> 
						<?php get_recently_popular(24, 'hour', 5, 0, 2, '<a href="%post_url%">%post_title%</a>'); ?> 
					</ul> 
				</div>
				<div class="most-tab" id="most-tabs-2">
					<div class="fb-recommendations" data-site="sotontab.co.uk" data-width="288" data-height="500" data-header="false"></div>
				</div>
				<div class="most-tab" id="most-tabs-3">
					<ul>
						<?php 

						  function filter_where($where = '') {
							//posts in the last 30 days
							$where .= " AND post_date > '" . date('Y-m-d', strtotime('-14 days')) . "'";
						
							return $where;
						  }
						add_filter('posts_where', 'filter_where');

						query_posts('orderby=comment_count&posts_per_page=>5&showposts=5');
						if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
							<li>
								<a href="<?php the_permalink(); ?>">
									<?php the_post_thumbnail('most-read-image'); ?>
									<div class="title"><?php the_title(); ?></div>
								</a>
								<div class="clear"></div>
							</li>
							<?php endwhile; ?>
							<?php else : ?>
							<li>Sorry, no posts were found.</li>
						<?php endif; ?>
					</ul>

					<?php remove_filter('posts_where', 'filter_where'); ?>
					
				</div>
			</div>
				
					
					<div id="author-post-list" class="sidebar-box">
						<div class="inner">
							
								<?php // this shows recent articles by the author
								$args=array(
								   'showposts' => 5,
								   'author' => $author_id,
								   'caller_get_posts'=>1
								);
								$posts=get_posts($args);
								if ($posts) {
								  $curuser = get_userdata($author_id);
								  $author_post_url=get_author_posts_url($curuser->ID, $curuser->nicename);
								  
								  echo '<h3><a href="' . $author_post_url . '" title="' . sprintf( __( "Posts by %s" ), $curuser->display_name ) . '" ' . '>Articles by ' . $curuser->display_name .'</a>:</h3>';							  
								  
								  ?>
								  <ul>
								  <?php
								  foreach($posts as $post) {
									setup_postdata($post); ?>
									<li>
										<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_post_thumbnail('small-picks-image') ?></a>
										<a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a>
										
										<div class="clear"></div>
									</li>
									
									<?php
								  } // foreach($posts
								} // if ($posts
								?>
							</ul>
						</div>
					</div>
						
						
			</div>

		</div><!-- #container -->


		
		
<?php get_footer(); ?>
