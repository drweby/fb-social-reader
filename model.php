<?php
/*
*	The model file for the Facebook Open Graph Actions Plugin
*
*/


class FbOgAction_Model {
	

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