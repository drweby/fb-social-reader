<?php

class SimpleCache {

	private $cacheDir;
	
	function __construct($val) {
		$this->cacheDir = $val;
	}

	public function put($key, $content) {
		if (! file_exists($this->cacheDir)) mkdir($this->cacheDir);
		$filename_cache = $this->cacheDir . '/' . $key . '.cache'; //Cache filename
		if (file_put_contents ($filename_cache ,  $content)) { // save the content
			return true;
		} else {
			return false;
		}
	}
	
	public function get($key) {
	  	$filename_cache = $this->cacheDir . '/' . $key . '.cache'; //Cache filename
	  	if (file_exists($filename_cache)) {               
	  		return file_get_contents ($filename_cache);   //Get contents from file
	    } else {
	    	return false;
	    }
	}
   
}

?>