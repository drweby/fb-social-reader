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

		// Set the cache 
		$cachePath = FB_OG_PLUGIN_PATH.'cache';
		$this->cache = new SimpleCache($cachePath);
		
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

	// Save the user cache
	function save_cache($user_id, $field, $data) {
		if ($this->cache->put($user_id.'_'.$field, $data)) {
			return true;
		} else {
			return false;
		}
	}

	// Get the cache for a user id
	function get_cache($data) {
		$cache  = $this->cache->get($data['fb_id'].'_'.$data['field']);
		if ($cache) {
			$this->$data['field'] = $cache;
			return true;
		} else {
			return false;
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