/*
  Pull in Lodash from CDNJS pure noConflict
*/
define(['https://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.0.1/lodash.min.js'], function(_) {
  var _ = _.noConflict();
  return _;
});