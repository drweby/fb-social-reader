define([
	'require',
	'app/helpers/single-format'
	], function(
		require,
		Format
	) {


	var Test = {};

	Test.run = function() {

		module('Single Format');

		test('names_list', function() {
			var reads, html;
			strictEqual(
				Format.names_list(Test.user, []),
				'<div class="sr_read_names">None of your friends have read this yet</div>',
				'0 reads'
			);

			reads = _.clone(Test.reads).slice(0, 1);
			strictEqual(
				Format.names_list(Test.user, reads),
				'<div class="sr_read_names">You read this</div>',
				'1 read'
			);

			reads = _.clone(Test.reads).slice(0, 2);
			html = '<div class="sr_read_names">';
			html += 'You and <a target="blank" href="//facebook.com/'+reads[1].from.id+'">'+reads[1].from.name+'</a>';
			html += ' read this</div>';
			strictEqual(
				Format.names_list(Test.user, reads),
				html,
				'2 reads'
			);

			reads = _.clone(Test.reads).slice(0, 3);
			html = '<div class="sr_read_names">';
			html += 'You, <a target="blank" href="//facebook.com/'+reads[1].from.id+'">'+reads[1].from.name+'</a>';
			html += ' and <a target="blank" href="//facebook.com/'+reads[2].from.id+'">'+reads[2].from.name+'</a>';
			html += ' read this</div>';
			strictEqual(
				Format.names_list(Test.user, reads),
				html,
				'3 reads'
			);

			reads = _.clone(Test.reads);
			html = '<div class="sr_read_names">';
			html += 'You, <a target="blank" href="//facebook.com/'+reads[1].from.id+'">'+reads[1].from.name+'</a>';
			html += ' and 2 others';
			html += ' read this</div>';
			strictEqual(
				Format.names_list(Test.user, reads),
				html,
				'4 reads'
			);

		});
			
		test('name', function() {
			strictEqual(
				Format.name(Test.not_me_read, Test.user), 
				'<a target="blank" href="//facebook.com/'+Test.not_me_read.from.id+'">'+Test.not_me_read.from.name+'</a>',
				'Not you name + link'
			);
			strictEqual(
				Format.name(Test.me_read, Test.user),
				'You',
				'You, just text'
			);
			strictEqual(Format.name(false, Test.user), '', 'No reads inputted');
			strictEqual(Format.name(Test.me_read, false), '', 'No user inputted');
			strictEqual(Format.name(false, false), '', 'Neither inputted');
		});	

		test('thumbs_list', function() {
			var setup_html = function(reads) {
				if (reads.length === 0) return false;
				var html = '';
				html += '<div class="sr_read_thumbs">';
				_.each(reads, function(read) {
					html += '<a target="blank" href="//facebook.com/'+read.from.id+'" title="'+read.from.name+'">';
					html += "<img src='//graph.facebook.com/" + read.from.id + "/picture' width='35' height='35' alt='"+read.from.name+"' />";
					html += '</a>';
				});
				html += '</div>';
				return html;
			};
			var reads = _.clone(Test.reads);
			strictEqual(Format.thumbs_list(Test.user, Test.reads), setup_html(Test.reads), 'Function works');
			reads = _.clone(Test.reads);
			reads.push(Test.reads[0]);
			strictEqual(Format.thumbs_list(Test.user, Test.reads), setup_html(Test.reads), 'Removes duplicates');
			strictEqual(Format.thumbs_list(Test.user, []), setup_html([]), 'Empty array');
		});

		test('check', function() {
			var reads = _.clone(Test.reads);
			reads.push(Test.reads[0]);
			deepEqual(Format.check(reads, Test.user), Test.reads, 'Removed duplicates');
			reads = _.clone(Test.reads);
			var first = reads[0];
			reads.shift();
			reads.push(first);
			deepEqual(Format.check(reads, Test.user), Test.reads, 'Reordered');
			deepEqual(Format.check([], Test.user), [], 'Empty array');
		});
		

	};

	Test.me_read = {
		from: {
			id: 578040382,
			name: 'Chris Houghton'
		}
	};
	Test.not_me_read = {
		from: {
			id: 4,
			name: 'Mark Zuckerberg'
		}
	};
	Test.user = {
		id: 578040382,
		name: 'Chris Houghton'
	};
	Test.reads = [
		{
			from: {
				id: 578040382,
				name: 'Chris Houghton'
			}
		},
		{
			from: {
				id: 4,
				name: 'Mark Zuckerberg'
			}
		},
		{
			from: {
				id: 530302653,
				name: 'Fiona Mcann'
			}
		},
		{
			from: {
				id: 506834704,
				name: 'James Seymour'
			}
		}
	];

	return Test;

});