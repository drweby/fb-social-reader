<?php 
/* 
	A php class to allow the adding of a sidebar widget (for the login and user details)
	
	Note that the widget will output exactly the same content as <?php fb_og_put_sidebar(); ?>
*/


add_action('widgets_init', 'fb_og_sidebar_widget');

function fb_og_sidebar_widget() {

	if ( !is_blog_installed() )

		return;

	register_widget('Fb_Og_Sidebar_Widget');

}

// The FB sidebar widget
class Fb_Og_Sidebar_Widget extends WP_Widget {
	
	
	function __construct() {
		parent::__construct(
			'fb-og-sidebar', 
			__('FB Social Reader Sidebar', 
			'fb-og-sidebar-widget'), 
			array(
				'classname' => 'widget_fb_og_sidebar', 
				'description' => __('The sidebar widget for Social Reader', 'fb-og-sidebar-widget')
			)
		);
	}
	
	function widget() { 
		?><div id="sr_sidebar_box"></div><?php 
	}

	function form( $instance ) {
		echo 'This widget can be configured in your ';
		echo '<a href="'.get_bloginfo('url').'/wp-admin/admin.php?page=fb-social-reader-widgets" target="blank">';
		echo 'Social Reader widgets page';
		echo '</a>';
	}
	
}


