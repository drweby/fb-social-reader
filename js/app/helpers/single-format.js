define(['require', 'underscore'], function(require, _) {

	var Format = {};

	Format.names_list = function(user, reads) {

		var _this = this;
		this.user = user;
		reads = this.check(reads);
		this.reads = reads;
		count = this.reads.length;

		// Set up html
		var html = '';
		html += '<div class="sr_read_names">';
		if (count === 0) {
			html += 'None of your friends have read this yet';
		} else if (count === 1) {
			html += this.name(reads[0])+' read this';
		} else if (count === 2) {
			html += this.name(reads[0])+' and '+this.name(reads[1])+' read this';
		} else if (count === 3) {
			html += this.name(reads[0])+ ', ';
			html += this.name(reads[1])+' and ';
			html += this.name(reads[2])+' read this';
		} else {
			html += this.name(reads[0])+', ';
			html += this.name(reads[1])+' and ';
			html += (count-2) + ' others read this';
		}
		html += '</div>';
		return html;

	};

	Format.name = function(read) {
		if (read.from.id == this.user.id) {
			return 'You';
		} else {
			return '<a href="//facebook.com/'+read.from.id+'">'+read.from.name+'</a>';
		}
	};

	Format.thumbs_list = function(user, reads) {
		reads = this.check(reads);
		var html = '';
		html += '<div class="sr_read_thumbs">';
		_.each(reads, function(read) {	
			html += '<a href="//facebook.com/'+read.from.id+'" title="'+read.from.name+'">';
			html += "<img src='//graph.facebook.com/" + read.from.id + "/picture' width='35' height='35' alt='"+read.from.name+"' />";
			html += '</a>';
		});
		html += '</div>';
		return html;
	};

	Format.check = function(reads) {
		var _this = this;
		var unique = []; 		// Make sure every user is unique
		reads = _.filter(reads, function(read) {
			if (_.indexOf(unique, read.from.id) === -1) {
				unique.push(read.from.id);
				return true;
			}
		});		
		reads = _.sortBy(reads, function(read) { // If you read it, make sure you're at the front of the array
			if (read.from.id == _this.user.id) {
				return 1;
			} else {
				return 2;
			}
		});
		return reads;
	};

	return Format;

});