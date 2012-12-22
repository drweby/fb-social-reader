<?php
/*
*	The controller file for the Facebook Open Graph Actions Plugin
*
*/


class FbOgAction_Controller {

	public $FbOgAction;

	
	// Kick things off with a bang
	function __construct() {
		
		// Add the model in as a variable within the controller
		$this->FbOgAction = new FbOgAction_Model;
			
		// Adds the doctype to the html
		add_filter('language_attributes', array('FbOgAction_Controller', 'add_doctype'));
		
		// Add the fb meta into the head
		add_action( 'wp_head', array($this, 'add_head_meta'));

		// Enqueue scripts and css
		add_action('wp_enqueue_scripts', array($this, 'add_sr_scripts'));
		add_filter( 'clean_url', array($this, 'fix_requirejs_script'), 11, 1 );

		// Get ajax to work front end
		add_action( 'wp_ajax__sr_ajax_hook', array($this, 'ajax'));
		add_action( 'wp_ajax_nopriv__sr_ajax_hook', array($this, 'ajax')); // need this to serve non logged in users


		// Add stylesheet and scripts for admin
		add_action('admin_print_styles', array($this, 'add_admin_stylesheets'));
		add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_widget_scripts'));
		
		// Create admin menu
		add_action( 'admin_menu', array($this, 'admin_create_menu'));
		
		// Register admin settings
		add_action( 'admin_init', array($this, 'admin_register_settings') );
		
		// Auto add friends who read this widget to the_content()
		add_filter('the_content', array($this, 'friends_read_auto_add_content'));

		
	}
	
	
	// Ajax handler
	function ajax() {
		$func = $_POST['type'];
		if (method_exists($this, $func)) $this->$func($_POST);	
		die(); 	// Required for wordpress ajax to work
	}

		

	/** Header stuff **/

	// Adds the doctype to the html
	function add_doctype( $output ) {
		return $output . ' xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml"';
	}

	// Enqueue scripts front-end
	function add_sr_scripts() {
		wp_enqueue_script('require', FB_OG_PLUGIN_URL . 'js/lib/require.js', array('jquery'), FB_OG_CURRENT_VERSION);
		wp_localize_script( 'require', '_sr_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
		wp_register_style( 'social-reader-style', FB_OG_PLUGIN_URL.'css/style.css');
		wp_enqueue_style( 'social-reader-style' );
	}

	function fix_requirejs_script( $url ) {
	    if ( strpos ($url, 'js/lib/require.js') ) { 
	    	if (isset($_GET['sr_debug'])) {
				return "$url' data-main='".FB_OG_PLUGIN_URL."js/app";
	    	} else {
	    		return "$url' data-main='".FB_OG_PLUGIN_URL."js/sr.min.js";
	    	}
	    } else {
	    	return $url;
	    }
	}

	// Setup auto read
	function is_readable($data) {

		// Get the app id the user has specified
		$app_id = get_option('fb_og_app_id');

		// Get post id
		$post_id = url_to_postid($data['url']);
		if ($post_id == 0) {
			echo 0;
			return false;
		}

		// Do checks
		if ((!$post_id) 
			|| $app_id == ''
			|| get_post_status($post_id) != 'publish'
		) return false;

		// See which post types we're publishing
		$custom_posts = get_post_types(array(
			'public' => true
		));	
		$types_publishing = array();
		foreach ($custom_posts as $type) {
			if ($type == 'post') {
				if (get_option('fb_og_custom_'.$type, 'on') == 'on') {
					$types_publishing[] = $type;
				} 
			} else {
				if (get_option('fb_og_custom_'.$type, 'off' ) == 'on') {
					$types_publishing[] = $type;
				}
			} 
		}

		// Add code if we're publishing to this type
		if (in_array(get_post_type($post_id), $types_publishing)) { 
			echo 1;	
		} else {
			echo 0;
		}

	}

	// Send back server details to the client side
	function get_client_details() {
		$options = array(
			'fb_app_id' => get_option('fb_og_app_id'),
			'login_meta' => get_option('fb_og_login_meta', "Logged in"),
			'login_promo' => get_option('fb_og_login_promo', "Log in and see what your friends are reading"),
			'auto_sharing_on' => get_option('fb_og_sidebar_publishing_on', "Auto sharing on"),
			'auto_sharing_off' => get_option('fb_og_sidebar_publishing_off', "Auto sharing off"),
			'activity' => get_option('fb_og_sidebar_activity', 'Activity'),
			'plugin_url' => FB_OG_PLUGIN_URL
		);
		echo json_encode($options);
	}

	// See if we're auto sharing (echo 1/0)
	function is_auto_sharing($data) {
		$result = $this->FbOgAction->is_auto_sharing(array(
			'fb_id' => $data['fb_id']
		));
		echo $result;
	}

	// Set auto sharing (echo 1/0)
	function set_auto_sharing($data) {
		if ($data['is_auto_sharing'] == 'true') {
			$data['is_auto_sharing'] = 1;
		} elseif ($data['is_auto_sharing'] == 'false') {
			$data['is_auto_sharing'] = 0;
		}
		$result = $this->FbOgAction->set_auto_sharing(array(
			'fb_id' => $data['fb_id'],
			'is_auto_sharing' => $data['is_auto_sharing']
		));
		if ($result == true) {
			echo 1;
		} else {
			echo 0;
		}
	}

	// Save the user to the database cache
	function save_cache($data) {
		if ($this->FbOgAction->save_cache($data)) {
			echo 1;
		} else {
			echo 0;
		}
	}

	// Get the user cache data
	function get_cache($data) {
		$result = $this->FbOgAction->get_cache(array(
			'fb_id' => $data['fb_id'],
			'field' => $data['field']
		));
		if ($result == true) {
			echo $this->FbOgAction->$data['field'];
		} else {
			echo 0;
		}
	}
	
	// Add the fb meta into the head
 	function add_head_meta() {
// 		if (get_option('fb_og_meta_disable') != 'on') {
// 			global $post;
// 			setup_postdata($post);
// 			if ( !is_singular()) return; //if it is not a post or a page, return
// 				echo "\n".'<!-- Facebook meta tags added by FB Social Reader -->'."\n";
// 				echo '<meta property="og:title" content="' . strip_tags( get_the_title() ). '"/>'."\n";
// 				echo '<meta property="og:description" content="' . strip_tags ( get_the_excerpt() ) . '"/>'."\n";
// 				echo '<meta property="og:type" content="article"/>'."\n";
// 				echo '<meta property="og:url" content="' . get_permalink() . '"/>'."\n";
// 				echo '<meta property="og:site_name" content="'.get_bloginfo('name').'"/>'."\n";
// 			if(!has_post_thumbnail( $post->ID )) { //the post does not have featured image, use a default image
// 				echo '<meta property="og:image" content="' . FB_OG_PLUGIN_URL.'images/fbdefaultarticle.png' . '"/>'."\n";
// 			}
// 			else{
// 				$thumbnail_src = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'fb_og_img' );
// 				echo '<meta property="og:image" content="' . esc_attr( $thumbnail_src[0] ) . '"/>'."\n";
// 			}
// 			echo '<!-- End of tags added by FB Social Reader -->'."\n";
// 			echo "\n";
// 		}
 	}
	
	
		
	/** Sidebar widget **/
	

	
	// Auto add before/after the_content()
	function friends_read_auto_add_content($content)  {
		
		// Get custom post types we're publishing, and if we're not publishing this type, don't add.
		// $custom_posts = get_post_types(array(
		// 	'public' => true
		// ));	
		// $types_publishing = array();
		// foreach ($custom_posts as $type) {
		// 	if (get_option('fb_og_custom_'.$type ) == 'on') {
		// 		$types_publishing[] = $type;
		// 	}
		// }
		// $post_id = get_the_ID();
		// if (in_array(get_post_type($post_id), $types_publishing) and get_post_status($post_id) == 'publish') {		
		// 	// Add before or after content
		// 	if (get_option('fb_og_friends_read_auto_add_content') == 'before') {
		// 		$content = fb_og_put_read_friends(false). $content;
		// 	} elseif (get_option('fb_og_friends_read_auto_add_content') == 'after') {
		// 		$content = $content . fb_og_put_read_friends(false);
		// 	}
		// }
		// return $content;
	}
	
	
	/** Admin stuff **/
	
	// Create settings page
	function admin_create_menu() {
	
		// Add the main menu
		add_menu_page("", "Social Reader", 'administrator', 'fb-social-reader', array($this, 'admin_settings'), FB_OG_PLUGIN_URL.'images/fb_og.png');	
		
		// Options
		add_submenu_page( 'fb-social-reader', 'Settings', 'Settings', "administrator", 'fb-social-reader', array($this, 'admin_settings'));
		add_submenu_page( 'fb-social-reader', 'Widgets', 'Widgets', "administrator", 'fb-social-reader-widgets', array($this, 'admin_widgets'));
		add_submenu_page( 'fb-social-reader', 'Support', 'Support', "administrator", 'fb-social-reader-support', array($this, 'admin_support'));
		
	}
	
	// Set an app id option
	function save_app_id($data) {
		update_option( 'fb_og_app_id', $data['app_id'] );
	}
	
	// Close the setup guide
	function close_setup_guide() {
		update_option( 'fb_og_setup_closed', true );
	}
	
	// Open the setup guide
	function open_setup_guide() {
		update_option( 'fb_og_setup_closed', false );
	}	
	
	// The admin settings page - all about editing options
	function admin_settings() {
		$custom_posts = get_post_types(array(
			'public' => true
		));	
		global $current_user;
		get_currentuserinfo();
		include('views/admin/settings.php');		
	}
	
	// The admin widgets page 
	function admin_widgets() {
		$update = $this->FbOgAction->get_latest_version();
		global $current_user;
		get_currentuserinfo();
		include('views/admin/widgets.php');
	}
	function admin_enqueue_widget_scripts() {
		//wp_enqueue_script('fb-og-admin', plugins_url('/js/fb-og-actions-admin.js', __FILE__));
		//wp_localize_script( 'fb-og-admin', 'fb_og_actions', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
		// wp_enqueue_script('fb-og-admin-widgets-mousewheel', plugins_url('/js/jquery.mousewheel.js', __FILE__));
		// wp_enqueue_script('fb-og-admin-widgets-scrollpane', plugins_url('/js/jquery.jscrollpane.js', __FILE__));
	}
	
	// Admin support page
	function admin_support() {
		if (isset($_POST['fb_og_support_query'])) {
			$query_url = '/customer/portal/articles/search?q='.$_POST['fb_og_support_query'];
		}
		include('views/admin/support.php');
	}

	// Send feedback 
	function send_feedback($data) {
		$this->FbOgAction->send_feedback($data);
	}
	
	// Register admin settings
	function admin_register_settings() {
	
		/* General options */
	
			// Fb app id
			register_setting( 'fb-og-settings-group', 'fb_og_app_id' );
			
			// If the user wants to add in the meta tags himself
			register_setting( 'fb-og-settings-group', 'fb_og_meta_disable' );
			
			// Register custom post types options
			$custom_posts = get_post_types(array(
				'public' => true
			));	
			foreach ($custom_posts as $type) {
				register_setting( 'fb-og-settings-group', 'fb_og_custom_'.$type );
			}
			
			// Mark the sidebar as closed
			register_setting( 'fb-og-settings-setup', 'fb_og_setup_closed' );	
			
				
			
		/* Sidebar widget options */
			
			// What is shown saying the user is logged in
			register_setting( 'fb-og-sidebar-widget-group', 'fb_og_login_meta' );
			
			// The promo text saying "sign up now!!!"
			register_setting( 'fb-og-sidebar-widget-group', 'fb_og_login_promo' );
			
			// The text shown for publishing on/off
			register_setting( 'fb-og-sidebar-widget-group', 'fb_og_sidebar_publishing_on' );
			register_setting( 'fb-og-sidebar-widget-group', 'fb_og_sidebar_publishing_off' );
			
			// The text shown for "your activity"
			register_setting( 'fb-og-sidebar-widget-group', 'fb_og_sidebar_activity' );
			
			
		/* Friends who read this widget options */
			
			// Auto add widget before/after the_content()
			register_setting( 'fb-og-friends-read-this-widget-group', 'fb_og_friends_read_auto_add_content' );
		
		
	}
	
	// Add custom stylesheet for the plugin
	function add_admin_stylesheets() {
		wp_register_style( 'fb-og-actions-quicksand-font', 'http://fonts.googleapis.com/css?family=Nothing+You+Could+Do|Quicksand:400,700,300' );
		wp_enqueue_style( 'fb-og-actions-quicksand-font' );
		wp_register_style( 'fb-og-actions-style', plugins_url('css/style.css', __FILE__) );
		wp_enqueue_style( 'fb-og-actions-style' );
		wp_register_style( 'fb-og-actions-admin-style', plugins_url('css/admin.css', __FILE__) );
		wp_enqueue_style( 'fb-og-actions-admin-style' );

	}	
	
	

	
}

?>