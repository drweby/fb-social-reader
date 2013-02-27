=== FB Social Reader Beta ===
Contributors: chrisjhoughton
Tags: facebook, fb social reader, open graph actions, social reader, wordpress social reader
Requires at least: 3.0
Tested up to: 3.5
Stable tag: 1.6.0.6
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html



Transform your Wordpress into a social reading experience.

== Description ==

<h3>Auto-share articles</h3>

When people read an article on your site with Social Reader, they automatically read the article on their Facebook profiles.

<h3>Share what you want</h3>

Social Reader provides a fully customizable sidebar widget. Don't want to share? Users can easily turn auto-sharing off. View recently read articles, and remove those they don't want shared.

<h3>Read with friends</h3>

Easily see if your friends have read an article, and see all the articles your friends have read recently.

<h3>Totally customizable</h3>

Admins can configure everything about the layout, from the text and labels, to adding custom CSS.


Related links: 

* <a href="https://getsatisfaction.com/fbsocialreader" target="blank">Support community</a>
* <a href="https://github.com/chrisjhoughton/social-reader" target="blank">Github Repository</a>


== Installation ==

1. Search for "FB Social Reader" in the "Admin > Plugins > Add New" part of your website
2. Click install

OR

1. Upload the zip file to "Plugins > Add New > Upload"
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Follow the instructions in the setup guide page in your WordPress admin section.


== Frequently Asked Questions ==

= What does this plugin do? =

This plugin allows your users to automatically share what they’re reading on your site on Facebook in the format: "Chris Houghton read this on Your Site". Users can see what their friends are reading too, transforming your site into a social reading experience.

= I'm having difficulty installing the plugin. = 

Please visit our <a href="https://getsatisfaction.com/fbsocialreader" target="blank">support community</a>.

= Do I need to have much of a knowledge of coding? =

No, you shouldn't need much knowledge of website coding to implement this plugin, although if you want to customize things you'll need a knowledge of CSS.

= How are "reads" different to Facebook likes/shares? =

Like and share buttons on your site require the user to click them to share the article on Facebook. Reads happen automatically.




== Screenshots ==

1. Each user must login to your Facebook App
2. Authenticates your app
3. "Read articles" appear on user's timeline
4. "Read articles" appear in "trending articles" within Facebook's feed
5. User sidebar
6. User can delete reads they don't want shared

== Changelog ==


= 1.6.0.6 =
Added fix so setup guide works again.

= 1.6.0.5 =
Removed support for asynchronous file loading, as it breaks W3 Total Cache

= 1.6.0.4 =
Now loading jQuery and JSON2 from a CDN, also fixed caching syntax errors which resulted in the widgets not loading

= 1.6.0.3 =
Fixed a bug where the /cache file didn't exist, breaking the plugin

= 1.6.0.2 =
Fixed bugs, sped up plugin significantly, now using global window._sr

= 1.6 =
Rewrote plugin from scratch, using JavaScript and caching mechanisms to vastly improve the user experience.

= 1.52 = 
Improved setup guide, added logout link on sidebar, better support system, easy to leave feedback, bug fixes.

= 1.51 = 
Bug fix causing sidebar to sometimes show incorrectly.

= 1.5 = 
Bug fixes, changed name, improved ease-of-setup with our new widgets page.

= 1.31 =
Fixed a bug appearing in 1.3

= 1.3 =
Overhauled a lot of the back-end of the code to improve stablity. The Facebook SDK no longer needs to be loaded front-end.

= 1.25 =
Improved error reporting.

= 1.24 =
Added the option to not automatically load the Facebook meta tags (to prevent conflicts)

= 1.21 =
Fixed an issue where HTML in the excerpt or title appeared the Facebook meta tags at the top of the website.

= 1.2 = 
The Facebook SDK can now be loaded behind the scenes, no copy & paste necessary (easier setup). Removed option to show Facebook Admin Ids. A few bug fixes.

= 1.13 =
Added a sidebar widget to be used instead of the php sidebar function. Also fixed a Facebook SDK code error for older browsers.

= 1.12 =
Removed function from the setup guide in the free version is for the premium. Improved admin feedback, preview, and support.

= 1.11 =
Free version now available!


== Upgrade Notice ==

Please delete the Facebook Javascript SDK you pasted after the opening <body> tag. It is now added automatically within the plugin.
