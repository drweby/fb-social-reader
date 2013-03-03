define(function() {

  // Sort an array (on basic level, or by sub key for array of objects)
  return function(arr, order, sub_key) {
    if (sub_key === undefined) {
      arr = arr.sort();
    } else {
      arr = arr.sort(function(a, b) {
        var x = a[sub_key]; var y = b[sub_key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }
    if ((order || 'asc') == 'desc') arr = arr.reverse();
    return arr;
  };

});
