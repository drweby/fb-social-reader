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
	register_widget('Fb_Og_Activity_Widget');

}

// The FB sidebar widget
class Fb_Og_Sidebar_Widget extends WP_Widget {
	
	
	function __construct() {
		$widget_ops = array('classname' => 'widget_fb_og_sidebar', 'description' => __('Put this in your sidebar instead of pasting the function fb_og_put_sidebar() into your sidebar.php', 'fb-og-sidebar-widget'));
		parent::__construct('fb-og-sidebar', __('FB Social Reader Sidebar', 'fb-og-sidebar-widget'), $widget_ops);
	}
	
	function widget() { ?>
		<div id="sr_sidebar_box"></div>
	<?php }
	
}

// The FB friend activity
class Fb_Og_Activity_Widget extends WP_Widget {
	
	
	function __construct() {
		$widget_ops = array('classname' => 'widget_fb_og_activity', 'description' => __('Put this in your sidebar instead of pasting the function fb_og_get_friends_activity() into your sidebar.php', 'fb-og-activity-widget'));
		parent::__construct('fb-og-activity', __('FB Social Reader Friend Activity', 'fb-og-activity-widget'), $widget_ops);
	}
	
	function widget() {
		fb_og_get_friends_activity();
	}
	
}


