<?php
/*
*	The model file for the Facebook Open Graph Actions Plugin
*
*/


class FbOgAction_Model {
	
	// The global wordpress database variable. Needed for querying.
	private $wpdb;
	
	// Table names stored
	private $app_table;

	// The cache directory
	private $cache;
	
	// Setup a few things
	function __construct() {

		// Set the global $wpdb variable as a model variable
		global $wpdb;
		$this->wpdb = $wpdb;
		$this->wpdb->show_errors();
		
		// Set the table name
		$this->app_table = $this->wpdb->prefix . "fb_social_reader";

		// Set the cache 
		$cachePath = FB_OG_PLUGIN_PATH.'cache';
		$this->cache = new SimpleCache($cachePath);

		
	}

	// Creates a table to store locally whether they are publishing read actions or not (required by facebook). Runs on activation.
	function install() {
	
		// We are forced to use $wpdb here becuase $this doesn't work in the activation hook for some reason
		global $wpdb;
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		
		// Create users table
		$sql = "CREATE TABLE ".$wpdb->prefix."fb_social_reader
		(
		fb_id bigint(30) NOT NULL,
		added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		data TEXT,
		PRIMARY KEY  (fb_id)
		);";
		dbDelta($sql);
	
	}
	

	// Activating the plugin
	function activate() {
		// send_client_data('activate');	
	}

	// Deactivating the plugin
	function deactivate() {
// 		send_client_data('deactivate');
	}

	// Uninstalling the plugin
	function uninstall() {
		
	}

	// See if we're auto sharing
	function is_auto_sharing($data) {
		$rows = $this->wpdb->get_results( "SELECT is_auto_sharing FROM $this->app_table WHERE fb_id=".$data['fb_id'] );
		if (count($rows) > 0 and isset($rows[0]->is_auto_sharing)) {
			return $rows[0]->is_auto_sharing;
		} else {
			$this->set_auto_sharing(array(
				'fb_id' => $data['fb_id'],
				'is_auto_sharing' => 1
			));
			return 1;
		}
	}

	// Set auto sharing
	function set_auto_sharing($data) {
		$countRows = $this->wpdb->get_results( "SELECT COUNT(*) AS count FROM $this->app_table WHERE fb_id=".$data['fb_id'] );
		if ($countRows[0]->count == 1) {
			$result = $this->wpdb->update( 
				$this->app_table, 
				array(
					'is_auto_sharing' => $data['is_auto_sharing']
				),
				array( 'fb_id' => $data['fb_id'] )
			);
		} else {
			$result = $this->wpdb->insert( 
				$this->app_table, 
				array(
					'fb_id' => $data['fb_id'],
					'is_auto_sharing' => $data['is_auto_sharing'],
					'friends_cache' => '',
					'activity_cache' => ''
				)			
			);			
		}
		if ($result == 1) {
			return true;
		} else {
			return false;
		}
	}

	// Save the user cache
	function save_cache($data) {
		$hashed_data = unpack('H*', stripslashes($data['data']));
		if ($this->cache->put($data['fb_id'].'_'.$data['field'], $hashed_data)) {
			return true;
		} else {
			return false;
		}
	}

	// Get the cache for a user id
	function get_cache($data) {
		$cache  = $this->cache->get($data['fb_id'].'_'.$data['field']);
		if ($cache) {
			$this->$data['field'] = pack('H*', $cache);
			return true;
		} else {
			return false;
		}
	}

	// Send feedback back to central server
	function send_feedback($data) {
	
		// Replace this with your own email address
		$to="feedback@fbsocialreader.com";

		// Extract form contents
		$name = $data['name'];
		$email = $data['email'];
		$website = get_bloginfo('url');
		$message = $data['content'];
								
		// Validate email address
		function valid_email($str) {
			return ( ! preg_match("/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/ix", $str)) ? FALSE : TRUE;
		}
		
		// Return errors if present
		$errors = "";
		
		if($name =='') { $errors .= "name,"; }
		if(valid_email($email)==FALSE) { $errors .= "email,"; }
		if($message =='') { $errors .= "message,"; }
		
		// Send email
		if($errors == '') {

			$headers =  'From: Admin Feedback <no-reply@'.$_SERVER['HTTP_HOST'].'>'. "\r\n" .
						'Reply-To: '.$email.'' . "\r\n" .
						'X-Mailer: PHP/' . phpversion();
			$email_subject = "Website Feedback Form: $email";
			$message="Name: $name \nEmail: $email \nWebsite: $website \n\nMessage:\n\n $message";
		
			mail($to, $email_subject, $message, $headers);
			echo "true";
		
		} else {
			echo "false";
		}
				
		
	}
	
	// Sees if we publish a certain post type
	function is_publishing_post_type($this_post_type) {
		if ($this_post_type == 'post') {
			$publishing = get_option('fb_og_custom_'.$this_post_type, true);
		} else {
			$publishing = get_option('fb_og_custom_'.$this_post_type, false);
		}		
		if ($publishing == 'on') {
			$publishing = true;
		} elseif ($publishing == 'off') {
			$publishing = false;
		}
		return $publishing;
	}



		
}


?>