<?php
/*
*	The controller file for the Facebook Open Graph Actions Plugin
*
*/


class SR_Controller {

	public $SR;

	
	// Kick things off with a bang
	function __construct() {
		
		// Add the model in as a variable within the controller
		$this->SR = new SR_Model;
		
		// Adds the doctype to the html
		add_filter('language_attributes', array($this, 'add_doctype'));
		
		// Add the fb meta into the head
		add_action( 'wp_head', array($this, 'add_head_meta'));

		// Enqueue scripts and css
		add_action('wp_enqueue_scripts', array($this, 'add_sr_scripts'));
		add_filter( 'clean_url', array($this, 'fix_requirejs_script'), 11, 1 );
		add_action( 'wp_head', array($this, 'add_custom_css'));

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
		if (isset($_GET['sr_tests'])) {
			wp_register_style( 'qunit-css', 'http://code.jquery.com/qunit/qunit-1.10.0.css');
			wp_enqueue_style( 'qunit-css' );
			wp_enqueue_script('qunit-js', 'http://code.jquery.com/qunit/qunit-1.10.0.js', array('jquery'), FB_OG_CURRENT_VERSION);
		}
	}

	// Add on 'data-main' to load the main file asynchronously
	function fix_requirejs_script( $url ) {
	    if ( strpos ($url, 'js/lib/require.js') ) { 
	    	if (is_admin()) {
	    		return "$url' data-main='".FB_OG_PLUGIN_URL."js/app.admin";
	    	} else {
		    	if (isset($_GET['sr_debug'])) {
					return "$url' data-main='".FB_OG_PLUGIN_URL."js/app";
		    	} else {
		    		return "$url' data-main='".FB_OG_PLUGIN_URL."js/sr.min";
		    	}	    		
	    	}
	    } else {
	    	return $url;
	    }
	}

	// Inject custom css 
	function add_custom_css() {
		if (get_option('fb_og_custom_css') != '') {
			echo "<style type='text/css'>";
			echo get_option('fb_og_custom_css');
			echo "</style>";
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
			'fb_channel_url' => FB_OG_PLUGIN_URL.'channel.html',
			'fb_sdk_disable' => get_option('fb_og_sdk_disable'),
			'login_meta' => get_option('fb_og_login_meta', "Logged in"),
			'login_promo' => get_option('fb_og_login_promo', "Log in and see what your friends are reading"),
			'auto_sharing_on' => get_option('fb_og_sidebar_publishing_on', "Auto sharing on"),
			'auto_sharing_off' => get_option('fb_og_sidebar_publishing_off', "Auto sharing off"),
			'activity' => get_option('fb_og_sidebar_activity', 'Activity'),
			'plugin_url' => FB_OG_PLUGIN_URL,
			'plugin_version' => FB_OG_CURRENT_VERSION,
			'analytics_disabled' => get_option('fb_og_analytics_disable')
		);
		echo json_encode($options);
	}

	// See if we're auto sharing (echo 1/0)
	function is_auto_sharing($data) {
		$result = $this->SR->is_auto_sharing(array(
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
		$result = $this->SR->set_auto_sharing(array(
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
		if ($this->SR->save_cache($data)) {
			echo 1;
		} else {
			echo 0;
		}
	}

	// Get the user cache data
	function get_cache($data) {
		$result = $this->SR->get_cache(array(
			'fb_id' => $data['fb_id'],
			'field' => $data['field']
		));
		if ($result == true) {
			echo $this->SR->$data['field'];
		} else {
			echo 0;
		}
	}
	
	// Add the fb meta into the head. Major kudos to Facebook Meta Tags plugin author Matt Say (shailan.com)
 	function add_head_meta(){
 		if (get_option('fb_og_meta_disable') == 'on') {
 			return false;
 		}

		global $wp_query;
		global $post;
		
		$thePostID = $wp_query->post->ID;
		
		$additional_tags = array();
		
		if(is_single() || is_page()){
			$the_post = get_post($thePostID); 
			// The title
			$title = apply_filters('the_title', $the_post->post_title);
			
			// Description
			if($the_post->post_excerpt){
				$desc = trim(esc_html(strip_tags(do_shortcode( apply_filters('the_excerpt', $the_post->post_excerpt) ))));
			} else {
	                $text = strip_shortcodes( $the_post->post_content );
	                $text = apply_filters('the_content', $text);
	                $text = str_replace(']]>', ']]&gt;', $text);
	                $text = addslashes( strip_tags($text) );
	                $excerpt_length = apply_filters('excerpt_length', 55);
	               
	                $words = preg_split("/[\n\r\t ]+/", $text, $excerpt_length + 1, PREG_SPLIT_NO_EMPTY);
	                if ( count($words) > $excerpt_length ) {
	                        array_pop($words);
	                        $text = implode(' ', $words);
	                        $text = $text . "...";
	                } else {
	                        $text = implode(' ', $words);
	                }
			
				$desc =  $text;
			} 
			
			$url = get_permalink( $the_post );
			
			// Tags
			$tags = get_the_tags();
			$tag_list = array();
			if($tags){
				foreach ($tags as $tag){
					$tag_list[] = $tag->name;
				}
			}
			$tags = implode( ",", $tag_list );
			
			if( 'video' == get_post_format() ){ // Video post
			
				$type = "video.other";
				
				$additional_tags[] = "\n\t<meta property=\"video:tag\" content=\"$tags\" />"; 			
			
			} else { // Default post
			
				$type = "article";
				
				// Author
				/*$author = get_the_author();
				$additional_tags[] = "\n\t<meta property=\"article:author\" content=\"$author\" />"; */
				
				// Category
				$category = get_the_category(); 
				$section =  $category[0]->cat_name;
				$additional_tags[] = "\n\t<meta property=\"article:section\" content=\"$section\" />"; 
				$additional_tags[] = "\n\t<meta property=\"article:tag\" content=\"$tags\" />"; 
			}
			
			// Post thumbnail
			if( has_post_thumbnail( $thePostID )){
				$thumb_id = get_post_thumbnail_id( $thePostID );
				$image = wp_get_attachment_image_src( $thumb_id, array(100,100) );
				$thumbnail = $image[0];
			} else {
				$thumbnail = '';
			}
			
		} else {
			$title = get_bloginfo('name');
			$desc = get_bloginfo('description');
			$type = "blog";
			$url = get_home_url();
			$thumbnail = '';
		}
		
		$site_name = get_bloginfo();
			
		echo "\n<!-- Facebook meta tags by Social Reader --> ";
		echo "\n\t<meta property=\"og:title\" content=\"$title\" />";
	    echo "\n\t<meta property=\"og:type\" content=\"$type\" />";
	    echo "\n\t<meta property=\"og:url\" content=\"$url\" />";
	    if ($thumbnail) echo "\n\t<meta property=\"og:image\" content=\"$thumbnail\" />";
	    echo "\n\t<meta property=\"og:site_name\" content=\"$site_name\" />";
		
		// Application ID
		$app_id = get_option('fb_og_app_id');
		if( '' !=  $app_id ){
			echo "\n\t<meta property=\"fb:app_id\" content=\"".$app_id."\"/>";
		}

	    echo "\n\t<meta property=\"og:description\"
	          content=\"$desc\" />";
			  
		echo implode($additional_tags);
					   
		echo "\n<!-- End of Facebook Meta Tags -->\n";
		
	}
	
	// Auto add before/after the_content()
	function friends_read_auto_add_content($content)  {
		
		// Get custom post types we're publishing, and if we're not publishing this type, don't add.
		$custom_posts = get_post_types(array(
			'public' => true
		));	
		$types_publishing = array();
		foreach ($custom_posts as $type) {
			if (get_option('fb_og_custom_'.$type ) == 'on') {
				$types_publishing[] = $type;
			}
		}
		$post_id = get_the_ID();
		if (in_array(get_post_type($post_id), $types_publishing) and get_post_status($post_id) == 'publish') {		
			// Add before or after content
			if (get_option('fb_og_friends_read_auto_add_content') == 'before') {
				$content = '<div id="sr_friends_single"></div>'. $content;
			} elseif (get_option('fb_og_friends_read_auto_add_content') == 'after') {
				$content = $content . '<div id="sr_friends_single"></div>';
			}
		}
		return $content;
	}
	
	
	/** Admin stuff **/
	
	// Create settings page
	function admin_create_menu() {
	
		// Add the main menu
		add_menu_page("", "Social Reader", 'administrator', 'fb-social-reader', array($this, 'admin_settings'), FB_OG_PLUGIN_URL.'images/fb_og.png');	
		
		// Options
		add_submenu_page( 'fb-social-reader', 'Settings', 'Settings', "administrator", 'fb-social-reader', array($this, 'admin_settings'));
		add_submenu_page( 'fb-social-reader', 'Widgets', 'Widgets', "administrator", 'fb-social-reader-widgets', array($this, 'admin_widgets'));
		
	}
	
	// Set an app id option
	function save_app_id($data) {
		if (update_option( 'fb_og_app_id', $data['app_id'] )) {
			echo 1;
		} else {
			echo 0;
		}
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
		include(FB_OG_PLUGIN_PATH.'/views/admin/settings.php');
	}
	
	// The admin widgets page 
	function admin_widgets() {
		global $current_user;
		get_currentuserinfo();
		$logged_in = get_option('fb_og_login_meta', 'You are logged in');
		$auto_sharing_on =  get_option('fb_og_sidebar_publishing_on', 'Publishing on'); 
		$auto_sharing_off = get_option('fb_og_sidebar_publishing_off', 'Publishing off');
		$activity = get_option('fb_og_sidebar_activity', 'Your activity');
		$login_promo =  get_option('fb_og_login_promo', 'Login with Facebook');
		$logout =  get_option('fb_og_logout', 'Logout');
		include(FB_OG_PLUGIN_PATH.'/views/admin/widgets.php');
	}
	function admin_enqueue_widget_scripts() {
		wp_enqueue_script('require', FB_OG_PLUGIN_URL . 'js/lib/require.js', array('jquery'), FB_OG_CURRENT_VERSION);
		wp_localize_script( 'require', '_sr_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
	}
	
	// Register admin settings
	function admin_register_settings() {
	
		/* General options */
	
			// Fb app id
			register_setting( 'fb-og-settings-group', 'fb_og_app_id' );
			
			// If the user wants to add in the meta tags himself
			register_setting( 'fb-og-settings-group', 'fb_og_meta_disable' );

			// If the client wants to disable the Facebook javascript sdk (they're loading it themselves)
			register_setting( 'fb-og-settings-group', 'fb_og_sdk_disable' );

			// If the user wants to disable our analytics
			register_setting( 'fb-og-settings-group', 'fb_og_analytics_disable' );
			
			// Register custom post types options
			$custom_posts = get_post_types(array(
				'public' => true
			));	
			foreach ($custom_posts as $type) {
				register_setting( 'fb-og-settings-group', 'fb_og_custom_'.$type );
			}
			
			// Mark the sidebar as closed
			register_setting( 'fb-og-settings-setup', 'fb_og_setup_closed' );	
			
			// Custom css for the widgets
			register_setting( 'fb-og-settings-group', 'fb_og_custom_css' );

			
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
			
			// Logout link
			register_setting( 'fb-og-sidebar-widget-group', 'fb_og_logout' );

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