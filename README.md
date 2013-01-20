# FB Social Reader version 1.6.0.2

Transform your Wordpress into a social reading experience. With Social Reader, your readers automatically share articles on your site they read to Facebook, and can see what their friends read too.

## Setup

1. Download and install the plugin from the Wordpress plugins directory
2. Activate it
3. Follow the setup steps in the plugin admin section 


## Implementation

Social Reader uses a widget-based implementation, using JavaScript to request data from Facebook using their SDK, communicate with the server, and populate divs with the appropriate views.

### Libraries used 

1. jQuery - set as a dependency within WordPress
2. Underscore.js - compiled within the minified file
3. Require.js - used to modularize and compile code

## Example usage 
### Sidebar 

Can be added using a WordPress widget in Appearance > Widgets, or by adding the following code to the `sidebar.php` template: 

`<div id='sr_sidebar_box'></div>`

Note that all the widget does is add this div.

### Friends who read this

Can be added to post pages by visiting the widgets page within the plugin settings, and set to automatically be inserted before/after `the_content()`. Alternatively, the following code can be added to `single.php`:

`<div id="sr_friends_single"></div>`

### Friends' activity 

This widget is automatically added after the opening `<body>` tag by the plugin, and is opened when 'activity' is clicked on the sidebar widget.



## Changelog

### 1.6.0.3 
Fixed a bug where the /cache file didn't exist, breaking the plugin

### 1.6.0.2
Fixed bugs, sped up plugin significantly, now using global window._sr


