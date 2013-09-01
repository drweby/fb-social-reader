define(function (require) {

	var	NameTpl = require("tpl!./format_name.html");


	var Format = Backbone.Model.extend({

		nameList: function(reads) {

			reads = this.addUserToFront(reads);
			count = reads.length;

			// Set up html
			var html = "";
			html += "<div class='read-names'>";
			if (count === 0) {
				html += "None of your friends have read this yet";
			} else if (count === 1) {
				html += this.name(reads[0])+" read this";
			} else if (count === 2) {
				html += this.name(reads[0])+" and "+this.name(reads[1])+" read this";
			} else if (count === 3) {
				html += this.name(reads[0])+ ", ";
				html += this.name(reads[1])+" and ";
				html += this.name(reads[2])+" read this";
			} else {
				html += this.name(reads[0])+", ";
				html += this.name(reads[1])+" and ";
				html += (count-2) + " others read this";
			}
			html += "</div>";
			return html;

		},

		name: function(read) {
			if (!read.from || !read.from.id || !read.from.name || !this.get("userId")) {
				return "";
			}
			return NameTpl(read, this.get("userId"));
		},

		thumbList: function(reads) {
			reads = this.addUserToFront(reads);
			var html = "";
			html += "<div class='read-thumbs'>";
			_.each(reads, function(read) {
				html += "<a target='blank' href='//facebook.com/" + read.from.id + "' title='" +read.from.name+ "'>";
				html += "<img src='//graph.facebook.com/" + read.from.id + "/picture' width='35' height='35' alt='"+read.from.name+"' />";
				html += "</a>";
			});
			html += "</div>";
			return html;
		},

		// If you read it, make sure you"re at the front of the array
		addUserToFront: function(reads) {
			return _.sortBy(reads, function(read) { 
				if (read.from.id === this.get("userId")) {
					return 1;
				} else {
					return 2;
				}
			});
		}



	});


	return Format;

});