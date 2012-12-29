define([
  'require',
  'app/helpers/debugger',
  'app/models/user',
  'app/helpers/time',
  'app/models/analytics',
  'app/helpers/sample-data'
  ], function(
    require,
    Debugger,
    Fb,
    Time,
    Analytics,
    SampleData
  ) {

	var Lightbox = {};

  Lightbox.load = function(user, site) {
    if (user.logged_in !== true) return;
    this.user = user;
    this.site = site;
    var _this = this;
    Debugger.log('Loading the lightbox', 0);
    if (user.logged_in === false) {
      Debugger.log("User is not logged in, don't load it");
      Debugger.log('Finished');
      return false;
    }
    Debugger.log('Prepending lightbox to <body>');
    $('<div/>', {
      id: 'sr_lightbox',
      html: "<div id='sr_lightbox_inner'></div>"
    }).prependTo('body');
    if ($('#sr_lightbox_inner').length !== 0) {
      Debugger.log("Lightbox added: SUCCESS");
    } else {
      Debugger.log("Lightbox added: FAILURE");
    }
    return Debugger.log('Finished');
  };

  Lightbox.setup_listeners = function() {
    var _this = this;
    Debugger.log('Setup jQuery listener for close lightbox link click');
    $('a#sr_close_lightbox').live('click', function() {
      return _this.close();
    });
  };

  Lightbox.show = function(type, User) {
    var _this = this;
    Debugger.log('Fade in lightbox', 0);
    Debugger.log('Fading');
    return $('#sr_lightbox').fadeIn('fast', function() {
      _this.show_activity(type, User);
      _this.setup_listeners();
      Analytics.setup_listeners('lightbox');
    });
  };

  Lightbox.close = function() {
    if (this.closing === true) return;
    this.closing = true;
    var _this = this;
    Debugger.log('Closing lightbox', 0);
    Debugger.log('Fading out');
    return $('#sr_lightbox').fadeOut(function() {
      $('#sr_lightbox #sr_lightbox_inner').html('');
      Debugger.log('Html lightbox inner set to blank');
      Debugger.log('Finished');
      delete _this.closing;
    });
  };

  Lightbox.show_activity = function(type, User) {
    var _this = this;
    $('#sr_lightbox_inner').html("<h3>Recent activity</h3><a id='sr_close_lightbox'>Close</a><div id='sr_loading'><img src='" + this.site.plugin_url + "/images/ajax-loader.gif' alt='Loading...'></div>			<ul id='sr_activity_tabs'>				<li id='sr_lightbox_everyone' class='sr_active_tab'><a>Everyone</a></li>				<li id='sr_lightbox_me'><a>Just you</a></li>			</ul>			<div id='sr_reads_list'><ul></ul><div id='sr_reads_empty'>None of your friends have read anything on this site yet.</div></div>		");
      var html, read, story_type, _i, _len, _ref;
      Debugger.log("Putting reads into the lightbox", 0);
      var reads;
      if (SampleData.is_on()) {
        console.log(SampleData);
        reads = SampleData.reads;
      } else {
        reads = User.activity.reads;
      }
      $('#sr_loading').hide();
      if (!reads || !reads.length) {
        Debugger.log('No reads found');
        $('#sr_reads_list').show();
        $('#sr_reads_list #sr_reads_empty').show();
      } else {
        Debugger.log("Found " + User.activity.reads.length + " reads");
        html = '';
        if (SampleData.is_on()) {
          _ref = SampleData.reads.data;
        } else {
          _ref = User.activity.reads;
        }
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          read = _ref[_i];
          if (read.from.id === User.user.id) {
            story_type = 'sr_me_story';
          } else {
            story_type = 'sr_friend_story';
          }
          if (!read.data || !read.data.article) {
            continue;
          }
          html += "<li id='sr_read_" + read.id + "' class='" + story_type + "'>           <a class='name' href='//facebook.com/" + read.from.id + "' target='blank'>              <img class='story-img' src='https://graph.facebook.com/" + read.from.id + "/picture' width='50' height='50' alt='" + read.from.name + "' />           </a>            <div class='story-inner'>             <div class='story-title'>               <a class='name' href='//facebook.com/profile.php?id=" + read.from.id + "' target='blank'>                 " + read.from.name + "                </a> read                 <a class='article' href='" + read.data.article.url + "' target='blank'>" + read.data.article.title + "</a>              </div>              <div class='story-meta'>                " + Time.relative(read.publish_time) + "                <span>&middot; <a class='sr_story_delete'>Delete</a></span>             </div>            </div>            <div class='sr_clear'></div>          </li>";
        }

        $('#sr_reads_list ul').html(html);
        Debugger.log('Html put: SUCCESS');
        Debugger.log('Showing stuff');
        $('#sr_activity_tabs').show();
        $('#sr_reads_list').show();
        Debugger.log('Adding jQuery listener for filter tabs');
        $("#sr_activity_tabs a").on("click", function() {
          Debugger.log('Lightbox activity tab click detected', 0);
          $('#sr_activity_tabs li').removeClass('sr_active_tab');
          Debugger.log('Removed class from existing tab');
          $(this).closest('li').addClass('sr_active_tab');
          Debugger.log('Added class to the clicked tab');
          if ($(this).closest('li').attr('id') === 'sr_lightbox_everyone') {
            Debugger.log('Everyone tab detected, show all stories');
            $('#sr_reads_list ul li').show();
          } else if ($(this).closest('li').attr('id') === 'sr_lightbox_me') {
            Debugger.log('Me tab detected, just show my stories');
            $('#sr_reads_list ul li.sr_friend_story').hide();
          }
          return Debugger.log('Finished');
        });
        Debugger.log('Adding jQuery listener for deleting reads');
        $('.sr_story_delete').on("click", function() {
          var read_id;
          read_id = $(this).closest('li').attr('id').replace('sr_read_', '');
          return _this.model.fb_delete_read(read_id, function(cb) {
            return $("#sr_read_{read_id}").fadeOut(function() {
              return $("#sr_read_{read_id}").remove();
            });
          });
        });
        return Debugger.log('Finished');
             
      }

  };

  return Lightbox;

});