<?php // A place where we put functions that shouldn't go in classes



/** Put html functions **/

	// Puts the app sidebar in 
	function fb_og_put_sidebar() { 
		
	}
	
	// Puts the html in the single page, where "Chris and X others read this" is shown (gets modded by jquery)
	function fb_og_put_read_friends($echo=true) { 

	}	
	
	// Put the html for the activity widget
	function fb_og_get_friends_activity() {
	}
	

/** End of put functions **/


/** Send client data to server **/

	// function send_client_data($type) {

	// 	// Setup curl params
	// 	$url = 'http://fbsocialreader.com/client_data.php';
	// 	$fields = array(
	// 		'website' => urlencode(md5(get_bloginfo('url'))),
	// 		'type' => urlencode($type),
	// 		'is_pro' => urlencode(FB_OG_IS_PRO),
	// 		'version_no' => urlencode(FB_OG_CURRENT_VERSION)
	// 	);

	// 	//url-ify the data for the POST
	// 	foreach($fields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
	// 	rtrim($fields_string, '&');

	// 	//open connection
	// 	$ch = curl_init();

	// 	//set the url, number of POST vars, POST data
	// 	curl_setopt($ch,CURLOPT_URL, $url);
	// 	curl_setopt($ch,CURLOPT_POST, count($fields));
	// 	curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);

	// 	//execute post
	// 	$result = curl_exec($ch);

	// 	//close connection
	// 	curl_close($ch);
		
	// }

/** End of client data function **/



