<?php
/*
*	The model file for the Facebook Open Graph Actions Plugin
*
*/


class SR_Model {
	
	// The global wordpress database variable. Needed for querying.
	private $wpdb;
	
	// Table names stored
	private $app_table;

	// The cache directory
	private $cache;
	
	// Setup a few things
	function __construct() {

		
	}

	// Creates a table to store locally whether they are publishing read actions or not (required by facebook). Runs on activation.
	function install() {
	
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

	// Set auto sharing
	function set_auto_sharing($data) {
		// Set auto sharing for the user
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