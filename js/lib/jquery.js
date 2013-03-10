/*
  Pull in jQuery from Google's CDN. If the shim init function actually worked, this wouldn't be needed.
*/
define(['//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'], function() {
  var $ = jQuery.noConflict(true);
  return $;
});