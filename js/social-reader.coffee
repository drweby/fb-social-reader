


# Used for general stuff that's not class specific
class SR_Helper 

	$ = jQuery

	# Setup debugger on create
	constructor: ->
		@start_debugger()

	# Start the debugger
	start_debugger: ->
		if @check_parameter_exists('sr_debug')
			@debug_mode = true
			console.log "***********************************************\n
* Welcome to the Social Reader debug console! *\n
***********************************************"
		else 
			@debug_mode = false

	# Show a debug message
	debug: (message, indent=1) ->
		if @debug_mode is true
			if indent is 1 
				console.log "  * #{message}"
			else if indent is 0
				console.log "\n#{message}:"
		else 
			return

	# See if a query parameter exists
	check_parameter_exists: (parameter) ->
	  
	  #Get Query String from url
	  fullQString = window.location.search.substring(1)
	  paramCount = 0
	  queryStringComplete = "?"
	  if fullQString.length > 0
	    
	    #Split Query String into separate parameters
	    paramArray = fullQString.split("&")
	    
	    #Loop through params, check if parameter exists.  
	    i = 0
	    while i < paramArray.length
	      currentParameter = paramArray[i].split("=")
	      #Parameter already exists in current url
	      return true  if currentParameter[0] is parameter
	      i++
	  false
			

	# Set cookie
	set_cookie: (c_name, value, exdays) ->
	  exdate = new Date()
	  exdate.setDate exdate.getDate() + exdays
	  c_value = escape(value) + ((if (not (exdays?)) then "" else "; expires=" + exdate.toUTCString()))
	  document.cookie = c_name + "=" + c_value

	# Get cookie
	get_cookie: (c_name) ->
	  ARRcookies = document.cookie.split(";")
	  i = 0
	  while i < ARRcookies.length
	    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="))
	    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1)
	    x = x.replace(/^\s+|\s+$/g, "")
	    return unescape(y)  if x is c_name
	    i++

	# Check to see if cookie is set
	check_cookie: (c_name) ->
	  cookie = @get_cookie(c_name)
	  if cookie? and cookie isnt ""
	    return true
	  else
	    return false

	# Delete cookie 
	remove_cookie: (c_name) ->
  		document.cookie = c_name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;" 

  	# Convert timestamp to relative time
	relative_time: (fb_time) ->
		timestamp = new Date(fb_time).getTime(); 
		msPerMinute = 60 * 1000
		msPerHour = msPerMinute * 60
		msPerDay = msPerHour * 24
		msPerMonth = msPerDay * 30
		msPerYear = msPerDay * 365
		elapsed = new Date().getTime() - timestamp
		if elapsed < msPerMinute
	    	Math.round(elapsed / 1000) + " seconds ago"
		else if elapsed < msPerHour
			Math.round(elapsed / msPerMinute) + " minutes ago"
		else if elapsed < msPerDay
	    	Math.round(elapsed / msPerHour) + " hours ago"
		else if elapsed < msPerMonth
	    	"About " + Math.round(elapsed / msPerDay) + " days ago"
		else if elapsed < msPerYear
	    	"About " + Math.round(elapsed / msPerMonth) + " months ago"
		else
	    	"About " + Math.round(elapsed / msPerYear) + " years ago"


# Used for high end data shit 
class SR_User_Model

	$ = jQuery

	# Set parameters on create
	constructor: (cb) ->

		@helper = new SR_Helper

		# Setup parameters 
		@params = 
			site: {}
			user: {}
			friends: []
			activity: []

		# Get client details and initialise facebook (populates parameters)
		@get_client_details =>
			@helper.debug('Finished')
			@fb_init =>
				cb()

	# Get details from server
	get_client_details: (cb) ->
		@helper.debug('Getting client site details', 0)
		if @helper.check_cookie('sr_site')
			@helper.debug('sr_site cookie exists, read details')
			@params.site = JSON.parse(@helper.get_cookie('sr_site'))
			if @params.site.fb_app_id
				@helper.debug('Read from sr_site cookie: SUCCESS')
			else 
				@helper.debug('Read from sr_site cookie: FAILURE')
			cb()
		else 
			@helper.debug('sr_site cookie does not exist, get details from server via ajax')
			$.post _sr_ajax.ajaxurl, { 
				action: "_sr_ajax_hook"
				type: "get_client_details"
			}, (data) =>
				@helper.debug('Ajax request successful')
				@params.site = JSON.parse(data)
				if @params.site 
					@helper.debug('Read from ajax request data: SUCCESS')
				else 
					@helper.debug('Read from ajax request data: FAILURE')
				if @helper.set_cookie('sr_site', JSON.stringify(@params.site), 1)
					@helper.debug('Setting site session cookie: SUCCESS')
				else 
					@helper.debug('Setting site session cookie: FAILURE')
				cb()
	    
	# Initialise facebook
	fb_init: (cb) =>

		@helper.debug('Initiliazing Facebook', 0)

		# Add fb root div right after body
		$('body').prepend('<div id="fb-root"></div>')
		@helper.debug('Prepended div fb-root to body')

		# Load it
		window.fbAsyncInit = =>

			# init the FB JS SDK\
			@helper.debug("Loading the SDK asynchronously with app id: #{@params.site.fb_app_id}")
			FB.init
			    appId: "#{@params.site.fb_app_id}" # App ID from the App Dashboard
			    channelUrl: "//localhost:8888/wordpress/channel.html" # Channel File for x-domain communication
			    status: true # check the login status upon init?
			    cookie: true # set sessions cookies to allow your server to access the session?
			    xfbml: true # parse XFBML tags on this page?

			# Additional initialization code such as adding Event Listeners goes here
			@helper.debug('SDK loaded')
			@helper.debug('Finished')
			@fb_is_logged_in =>
				if @params.user.logged_in is true
					@fb_get_user =>
						@fb_get_friend_users =>
							cb()
				else 
					cb()

		# Load the SDK's source Asynchronously
		# Note that the debug version is being actively developed and might 
		# contain some type checks that are overly strict. 
		# Please report such bugs using the bugs tool.
		((d, debug) =>
		  js = undefined
		  id = "facebook-jssdk"
		  ref = d.getElementsByTagName("script")[0]
		  return  if d.getElementById(id)
		  js = d.createElement("script")
		  js.id = id
		  js.async = true
		  js.src = "//connect.facebook.net/en_US/all" + ((if debug then "/debug" else "")) + ".js"
		  ref.parentNode.insertBefore js, ref
		) window.document, false #debug		

	# Get fb login status
	fb_is_logged_in: (cb) ->
		@helper.debug('See if user is logged in', 0)	
		@helper.debug('Query Facebook')
		FB.getLoginStatus (response) =>
			@helper.debug('Response from Facebook received')
			if response.status is 'connected'	
				@helper.debug('User is logged in')
				@params.user.logged_in = true
				@helper.debug('Finished')
				cb()
			else
				@helper.debug('User is not logged in')
				@params.user.logged_in = false
				@helper.debug('Finished')
				cb()

	# Get fb user
	fb_get_user: (cb) ->
		@helper.debug('Get Facebook user', 0)
		if @helper.check_cookie('sr_user')
			@helper.debug('User cookie is set, read from that')
			@params.user = JSON.parse(@helper.get_cookie('sr_user'))
			if @params.user.id 
				@helper.debug('Read from sr_user cookie: SUCCESS')
				@helper.debug('Finished')
				cb()
				return
			else 
				@helper.debug('Read from cookie error, query Facebook again')	
		@helper.debug('Querying Facebook')
		FB.api '/me', (me) => 
			@helper.debug('Response received, setting values')
			@params.user.id = me.id
			@params.user.name = me.name
			@params.user.link = me.link
			@params.user.picture = "//graph.facebook.com/#{me.id}/picture"
			@params.user.auto_sharing = @is_auto_sharing()
			@helper.debug('Setting cookie')
			@helper.set_cookie('sr_user', JSON.stringify(@params.user), 1)
			@helper.debug('Finished')
			cb()

	# Get your friends who use the app
	fb_get_friend_users: (cb) =>
		@helper.debug('Get Facebook friends using the app', 0)
		if @helper.check_cookie('sr_friends')
			@helper.debug('Friends cookie is set, read from that')
			@params.friends = JSON.parse(@helper.get_cookie('sr_friends'))
			if @params.friends.count isnt "undefined"
				@helper.debug('Read friends from cookie: SUCCESS')
				@helper.debug 'Finished'
				cb()
				return
			else 
				@helper.debug('Read from cookie error, query Facebook again')			
		@helper.debug('Querying Facebook')
		FB.api '/me/friends?fields=name,installed', (response) =>
			@helper.debug('Response received, finding friend users')
			for friend in response.data
				if friend.installed is true
					delete friend.installed
					@params.friends.push(friend)
			@helper.debug("#{@params.friends.length} friends found")
			@helper.debug('Setting cookie')
			@helper.set_cookie('sr_friends', JSON.stringify(@params.friends), 1)
			@helper.debug('Finished')
			cb()

	# Login the user to the app
	fb_login: (cb) ->
		@helper.debug('Logging in the user to Facebook', 0)
		FB.login ((response) =>
			@helper.debug('Response received from Facebook')
			if response.status is 'connected'
				@helper.debug('Logged in successfully')
				window.parent.location.reload()
			else
				@helper.debug("User cancelled login or did not fully authorize.")
		),
		  scope: "publish_actions"

	# Logout the user from Facebook
	fb_logout: (cb) ->
		@helper.debug('Logging the user out of Facebook', 0)
		FB.logout (response) =>
			@helper.debug('Logout successful')
			@helper.debug('Removing cookies')
			@helper.remove_cookie('sr_user')
			@helper.remove_cookie('sr_site')
			@helper.remove_cookie('sr_friends')
			@helper.debug('Reloading the page')
			window.parent.location.reload()

	# Read the article you're currently on
	fb_add_read: (cb) ->
		@helper.debug('Adding user read', 0)
		FB.api "/me/news.reads?article=#{document.URL}", "post", (response) =>	
		  	@helper.debug('Response received from Facebook')	  
		  	if response.id
		  		@helper.debug("Read #{response.id} posted to Facebook: SUCCESS")	
		  	else 
		  		@helper.debug("Read posted to Facebook: FAILURE")
		  		@helper.debug("Error message from Facebook: #{response.error.message} ")
		  	@helper.debug('Finished')
		  	cb() if cb?

	# Deletes a read from the api
	fb_delete_read: (id, cb) ->
		@helper.debug('Deleting user read', 0)
		FB.api "/" + id, "delete", (response) =>
			@helper.debug('Response received from Facebook')	
			if response is true
				@helper.debug('Read deleted from Facebook: SUCCESS')	
			else
		  	@helper.debug('Read deleted from Facebook: FAILURE')
		  	@helper.debug('Error message from Facebook: #{response.error.message}')
		  cb()

	# Set auto publishing
	set_auto_sharing: (bool) ->
		@helper.debug('Setting auto sharing', 0)
		@helper.debug("Changing auto sharing to #{bool}")
		@params.user.auto_sharing = bool
		@helper.set_cookie('sr_user', JSON.stringify(@params.user), 1)
		@helper.set_cookie('sr_auto_sharing', bool, 30)
		if @is_auto_sharing() is bool
			@helper.debug('Cookie set: SUCCESS')
			@helper.debug('Finished')
			return true
		else 
			@helper.debug('Cookie set: FAILURE')
			@helper.debug('Finished')
			return false

	# Looks to see if we're auto sharing
	is_auto_sharing: ->
		@helper.debug("See if we're auto sharing")
		if @helper.check_cookie('sr_auto_sharing') is false	
			@helper.debug("No cookie set, assume we are auto-sharing")
			return true
		else 
			@helper.debug("Cookie is set")
			if @helper.get_cookie('sr_auto_sharing') is 'true'
				@helper.debug("Cookie auto sharing set to true")
				return true
			else 
				@helper.debug("Cookie auto sharing set to false")
				return false

	# Get my activity
	fb_get_activity: (cb) ->
		@helper.debug('Getting activity of you and friends', 0)
		if @params.activity.reads 
			@helper.debug('Activity reads parameter already exists, use that')
			@helper.debug('Finished')
			cb()
			return
		else 
			@helper.debug('Activity reads does not exist, create and fetch from Facebook')
			@params.activity.reads = []
			@helper.debug('Creating batch array')
			batch_arr = []
			batch_arr.push({method: "GET", relative_url: "me/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"})
			for user in @params.friends
				batch_arr.push({method: "GET", relative_url: "#{user.id}/news.reads?fields=id,comment_info,comments,comment_info,likes,like_info,data,publish_time,from"})
			@helper.debug("Starting batch requests for the #{@params.friends.length} friends using this app")
			FB.api "/", "POST",
				batch: batch_arr
			, (responses) =>
				@helper.debug('Response received from Facebook')
				@helper.debug('Added reads to reads param array')
				for response in responses
					body = JSON.parse(response.body)
					for read in body.data
						@params.activity.reads.push(read)
				@helper.debug('Finished')
				cb()



# Used for layout manipulations and prettyness
class SR_User_Controller

	$ = jQuery

	# Initialise model in variable
	constructor: (cb) ->
		@User = new SR_User_Model =>
			@helper = @User.helper
			cb()

	# Load the sidebar
	load_sidebar: ->
		if $('#sr_sidebar_box').length is 0
			@helper.debug('#sr_sidebar_box is not found, cannot load sidebar.')
			return false
		_this = this;
		@helper.debug("Loading the sidebar", 0)

		if window._sr.User.params.user.logged_in is true

			@helper.debug("User is logged in")

			# Put html
			if @User.params.user.auto_sharing is true 
				toggled_class = 'sr_sidebar_toggled_on'
			else 
				toggled_class = 'sr_sidebar_toggled_off'
			@helper.debug("User auto-sharing is set to: #{@User.params.user.auto_sharing}")
			@helper.debug('Putting html')
			$('#sr_sidebar_box').html("
				<div id='sr_sidebar_logged_in'>			
					<a target='blank' href='#{@User.params.user.link}'>
						<img src='#{@User.params.user.picture}' width='50' height='50' alt='#{@User.params.user.name}' />
					</a>
					<div id='sr_sidebar_right'>
						<div id='sr_sidebar_name'><a target='blank' href='#{@User.params.user.link}'>#{@User.params.user.name}</a></div>
						<div id='sr_sidebar_promo'>#{@User.params.site.login_meta}</div>
						<div id='sr_sidebar_logout'><a>Logout</a></div>
					</div>
					<div class='clear'></div>
					<div id='sr_sidebar_bottom'>
						<div class='sr_sidebar_toggle #{toggled_class}'>
							<a title='Auto sharing to Facebook is enabled'>#{@User.params.site.auto_sharing_on}</a> 
						</div>
						<div id='sr_sidebar_activity'><a>#{@User.params.site.activity}</a></div>
					</div>
				</div>
			")
			if $('#sr_sidebar_box').html() isnt ''
				@helper.debug("Html put: SUCCESS")
			else 
				@helper.debug("Html put: FAILURE")

			@helper.debug("Setup jQuery listener for toggle auto-sharing link click")
			$("#sr_sidebar_box .sr_sidebar_toggle").on "click", ->
				if $(@).attr('class').match(/sr_sidebar_toggled_on/)
					$(@).removeClass('sr_sidebar_toggled_on')
					$(@).addClass('sr_sidebar_toggled_off')
					_this.User.set_auto_sharing(false)
				else if $(@).attr('class').match(/sr_sidebar_toggled_off/)
					$(@).removeClass('sr_sidebar_toggled_off')
					$(@).addClass('sr_sidebar_toggled_on')
					_this.User.set_auto_sharing(true)

			@helper.debug("Setup jQuery listener activity link click")
			$("#sr_sidebar_box #sr_sidebar_activity").on "click", =>
				@show_lightbox('all_activity')

			@helper.debug('Setup jQuery listener for logout link click')
			$('#sr_sidebar_box #sr_sidebar_logout').on "click", =>
				@User.fb_logout()

			@helper.debug('Finished')

		# Show not logged in sidebar
		else 
			@helper.debug('User is not logged in, show login button')
			@helper.debug('Putting html')
			$('#sr_sidebar_box').html("
				<div id='sr_sidebar_logged_out'>			
					Login and read with your friends
					<a id='sr_sidebar_login'><img src='#{@User.params.site.plugin_url}/images/facebooklogin.jpg' width='180' height='40' /></a>
				</div>
			")
			if $('#sr_sidebar_box').html() isnt ''
				@helper.debug("Html put: SUCCESS")
			else 
				@helper.debug("Html put: FAILURE")
			@helper.debug('Adding jQuery listener for login button click')
			$('#sr_sidebar_box #sr_sidebar_login').on "click", ->
				$(@).css('opacity', 0.7);
				_this.User.fb_login()			
			
	# Load the friends who read this widget
	load_friends_read_single: ->
		@helper.debug('Loading friends who read this widget', 0)
		if $('#sr_friends_single').length is 0
			@helper.debug('#sr_friends_single is not found, cannot load friends who read this widget.')
			return false
		@User.fb_get_activity =>
			# do shit - format and put 

	# Load the activity lightbox
	load_lightbox: ->
		@helper.debug('Loading the lightbox', 0)

		# Cancel if logged out
		if window._sr.User.params.user.logged_in is false
			@helper.debug("User is not logged in, don't load it")
			@helper.debug('Finished')
			return false

		# Add the lightbox
		@helper.debug('Prepending lightbox to <body>')
		$('<div/>',
 			id: 'sr_lightbox'
 			html: "<div id='sr_lightbox_inner'></div>"
		).prependTo('body')
		if $('#sr_lightbox_inner').length isnt 0 
			@helper.debug("Lightbox added: SUCCESS")
		else 
			@helper.debug("Lightbox added: FAILURE")

		# Add listener to close it
		@helper.debug('Setup jQuery listener for close lightbox link click')
		$('a#sr_close_lightbox').live 'click', =>
			@close_lightbox()

		@helper.debug('Finished')

	# Close the lightbox by fading out and removing html
	close_lightbox: ->
		@helper.debug('Closing lightbox', 0)
		@helper.debug('Fading out')
		$('#sr_lightbox').fadeOut =>
			$('#sr_lightbox #sr_lightbox_inner').html('')
			@helper.debug('Html lightbox inner set to blank')
			@helper.debug('Finished')

	# Load the user activity
	show_lightbox: (type) ->
		@helper.debug('Fade in lightbox', 0)
		@helper.debug('Fading')
		$('#sr_lightbox').fadeIn 'fast', =>
			@helper.debug('Finished')
			@show_activity(type)

	# Show activity
	show_activity: (type) ->
		$('#sr_lightbox_inner').html("
			<h3>Recent activity</h3>
			<a id='sr_close_lightbox'>Close</a>
			<div id='sr_loading'><img src='#{@User.params.site.plugin_url}/images/ajax-loader.gif' alt='Loading...'></div>
			<ul id='sr_activity_tabs'>
				<li id='sr_lightbox_everyone' class='sr_active_tab'><a>Everyone</a></li>
				<li id='sr_lightbox_me'><a>Just you</a></li>
			</ul>
			<div id='sr_reads_list'><ul></ul></div>
		")
		@User.fb_get_activity =>
			@helper.debug("Putting reads into the lightbox", 0)
			$('#sr_loading').hide()
			@helper.debug("Found #{@.User.params.activity.reads.length} reads")
			html = ''
			for read in @User.params.activity.reads
				if read.from.id is @User.params.user.id
					story_type = 'sr_me_story'
				else 
					story_type = 'sr_friend_story'
				continue if !read.data or !read.data.article
				html += "
					<li id='sr_read_#{read.id}' class='#{story_type}'>
						<a class='name' href='//facebook.com/#{read.from.id}' target='blank'>
							<img class='story-img' src='https://graph.facebook.com/#{read.from.id}/picture' width='50' height='50' alt='#{read.from.name}' />
						</a>
						<div class='story-inner'>
							<div class='story-title'>
								<a class='name' href='//facebook.com/profile.php?id=#{read.from.id}' target='blank'>
									#{read.from.name}
								</a> read 
								<a class='article' href='#{read.data.article.url}' target='blank'>#{read.data.article.title}</a>
							</div>
							<div class='story-meta'>
								#{@helper.relative_time(read.publish_time)}
								<span>&middot; <a class='sr_story_delete'>Delete</a></span>
							</div>
						</div>
						<div class='sr_clear'></div>
					</li>"
			$('#sr_reads_list ul').html(html)
			@helper.debug('Html put: SUCCESS')
			@helper.debug('Showing stuff')
			$('#sr_activity_tabs').show()
			$('#sr_reads_list').show()
			@helper.debug('Adding jQuery listener for filter tabs')
			$("#sr_activity_tabs a").on "click", ->
				_this.helper.debug('Lightbox activity tab click detected', 0)
				$('#sr_activity_tabs li').removeClass('sr_active_tab')
				_this.helper.debug('Removed class from existing tab')
				$(@).closest('li').addClass('sr_active_tab')
				_this.helper.debug('Added class to the clicked tab')
				if $(@).closest('li').attr('id') is 'sr_lightbox_everyone' 
					_this.helper.debug('Everyone tab detected, show all stories')
					$('#sr_reads_list ul li').show()
				else if $(@).closest('li').attr('id') is 'sr_lightbox_me'
					_this.helper.debug('Me tab detected, just show my stories')
					$('#sr_reads_list ul li.sr_friend_story').hide()
				_this.helper.debug('Finished')
			@helper.debug('Adding jQuery listener for deleting reads')
			$('.sr_story_delete').on "click", ->
				read_id = $(@).closest('li').attr('id').replace('sr_read_', '')
				_this.User.fb_delete_read read_id, (cb) ->
					$("#sr_read_{read_id}").fadeOut ->
						$("#sr_read_{read_id}").remove()
			@helper.debug('Finished')


jQuery(document).ready ->

	# Trigger stuff
	window._sr = new SR_User_Controller =>
		window._sr.load_sidebar()
		window._sr.load_lightbox()
		window._sr.load_friends_read_single()


	






