<?php
/*
Plugin Name: FB Social Reader BETA
Plugin URI: http://fbsocialreader.com/
Description: Transform your Wordpress into a social reading experience. With Social Reader, your readers automatically share articles on your site they read to Facebook, and can see what their friends read too.
Version: 1.52
Author: Chris Houghton
Author URI: http://fbsocialreader.com/
License: Regular
*/

// Set constants
define( 'FB_OG_PUGIN_NAME', 'FB Social Reader BETA');
define( 'FB_OG_PLUGIN_URL', plugin_dir_url( __FILE__ ));
define( 'FB_OG_CURRENT_VERSION', '1.6' );

// Include the functions file for functions that don't belong in classes
include_once ('functions.php');

// Include the model 
include_once ('model.php');

// Include the controller
include_once ('controller.php');

// Include formatter
include('views/helpers/format.php');

// Include widget
include('widget.php');

// Create the controller - this is what runs everything else
$fbOgAction = new FbOgAction_Controller;

// Activation hooks (can't go in the model construct for some reason - I think they run before the model is created)
register_activation_hook( __FILE__, array('FbOgAction_Model', 'install'));
register_activation_hook( __FILE__, array('FbOgAction_Model', 'activate'));
register_deactivation_hook( __FILE__, array('FbOgAction_Model', 'deactivate'));
register_uninstall_hook( __FILE__, array('FbOgAction_Model', 'uninstall'));	




?>