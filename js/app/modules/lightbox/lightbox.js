define(function(require) {

  var Time            = require("./time");
  var LightboxTpl     = require("tpl!app/html/lightbox.html");
  var LightboxReadTpl = require("tpl!app/html/lightbox-read.html");


	var Lightbox = Backbone.View.extend({

    ui: {
      lightbox: ".sr_lightbox",
      closeLightbox: ".close-lightbox"
    },

    render: function() {
      $("<div/>", {
        id: "sr_lightbox",
        html: "<div id=\"sr_lightbox_inner\"></div>"
      }).prependTo("body");
    },

    listen: function() {
      var _this = this;
      $("a#sr_close_lightbox").on("click", function() {
        _this.close();
      });
    },

    show: function() {
      var self = this;
      $("#sr_lightbox").fadeIn("fast", function() {
        self.show_activity(type, User);
        self.listen();
      });
    },

    close: function() {
      if (this.closing === true) return;
      this.closing = true;
      var _this = this;
      $("#sr_lightbox").fadeOut(function() {
        $("#sr_lightbox #sr_lightbox_inner").html("");
        delete _this.closing;
      });
    },

    showActivity: function() {
      var _this = this;
      var lightbox_template = _.template(LightboxHtml);
      var lightbox_html = lightbox_template(window._sr);
      $("#sr_lightbox_inner").html(lightbox_html);
        var reads = Fb.put_all_reads_in_one_array(window._sr.activity.reads);
        $("#sr_loading").hide();
        if (!reads || !reads.length) {
          $("#sr_reads_list").show();
          $("#sr_reads_list #sr_reads_empty").show();
        } else {
          var html = "";
          var read_template = _.template(LightboxReadHtml);
          _.each(reads, function(read) {
            if (!read.data || !read.data.article || !read.publish_time) {
              return;
            }
            read.relative_time = Time.relative(read.publish_time);
            html += read_template(read);
          });
          $("#sr_reads_list ul").html(html);
          $("#sr_activity_tabs").show();
          $("#sr_reads_list").show();
          $("#sr_activity_tabs a").on("click", function() {
            $("#sr_activity_tabs li").removeClass("sr_active_tab");
            $(this).closest("li").addClass("sr_active_tab");
            if ($(this).closest("li").attr("id") === "sr_lightbox_everyone") {
              $("#sr_reads_list ul li").show();
            } else if ($(this).closest("li").attr("id") === "sr_lightbox_me") {
              $("#sr_reads_list ul li.sr_friend_story").hide();
            }
            return Debugger.log("Finished");
          });
          $(".sr_story_delete").on("click", function() {
            var read_id;
            read_id = $(this).closest("li").attr("id").replace("sr_read_", "");
            return Fb.delete_read(read_id, function(cb) {
              return $("#sr_read_"+read_id).fadeOut(function() {
                return $("#sr_read_"+read_id).remove();
              });
            });
          });
          return Debugger.log("Finished");
        }
    }

  });


  return Lightbox;

});