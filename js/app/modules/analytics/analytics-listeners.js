define(function() {

	var Listeners = {};

	Listeners.sidebar_logged_in = [
		{ 
			selector: '#sr_sidebar_activity a',
			actions: ['click', 'mouseenter'],
			label: 'Activity'
		},
		{
			selector: '.sr_sidebar_toggle',
			actions: ['click', 'mouseenter'],
			label: 'Toggle auto-sharing'
		},
		{
			selector: 'a#sr_sidebar_img',
			actions: ['click', 'mouseenter'],
			label: 'Profile picture'				
		},
		{
			selector: '#sr_sidebar_name',
			actions: ['click', 'mouseenter'],
			label: 'Profile name'			
		},
		{
			selector: '#sr_sidebar_logout a',
			actions: ['click', 'mouseenter'],
			label: 'Logout'				
		}
	];

	Listeners.sidebar_logged_out = [
		{ 
			selector: 'a#sr_sidebar_login',
			actions: ['click', 'mouseenter'],
			label: 'Login button'
		}
	];

	Listeners.frs_single = [
		{
			selector: '.sr_read_names a',
			actions: ['click', 'mouseenter'],
			label: 'Name'
		},
		{
			selector: '.sr_read_thumbs a',
			actions: ['click', 'mouseenter'],
			label: 'Thumb'
		}
	];

	Listeners.lightbox = [
		{
			selector: 'a#sr_close_lightbox',
			actions: ['click', 'mouseenter'],
			label: 'Close'
		}, 
		{
			selector: '#sr_lightbox_everyone a',
			actions: ['click', 'mouseenter'],
			label: 'Show everyone tab'
		},
		{
			selector: '#sr_lightbox_me a',
			actions: ['click', 'mouseenter'],
			label: 'Show me tab'
		},
		{
			selector: '#sr_lightbox_inner li a img.story-img',
			actions: ['click', 'mouseenter'],
			label: 'Story profile pic'
		},
		{
			selector: '#sr_lightbox_inner li .story-title a.name',
			actions: ['click', 'mouseenter'],
			label: 'Story user name'
		},		
		{
			selector: '#sr_lightbox_inner li .story-title a.article',
			actions: ['click', 'mouseenter'],
			label: 'Story article title'
		},
		{
			selector: '#sr_lightbox_inner li a.sr_story_delete',
			actions: ['click', 'mouseenter'],
			label: 'Story delete'
		}
	];

	return Listeners;

});