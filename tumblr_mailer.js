var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');
var mandrill = require('mandrill-api/mandrill');

var mandrill_client = new mandrill.Mandrill('exbiSNeVtJH5LJ7ARkVoIA');

var client = tumblr.createClient({
  consumer_key: 'cuGcD2ygt53cFfiRTIOyiC2Fk2CNVjJ85AUUbsZ4QEuEFlMa3q',
  consumer_secret: '0qWlE0B6EkOkdDuRB0b19KHFV404QUnln6YL5XUDyxOK29ND4P',
  token: 'A8txXijaCgIIjqBeZNz1Mlne0EMRopzR2ocVd7ptDFBvQ8fs3h',
  token_secret: 'dDh4appYlWT4OdwUyXcHFpFdM8nKqHsbvhLLlHAQUOJc9yFv7K'
});

var csvFile = fs.readFileSync('friend_list.csv', 'utf8');

function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
	var message = {
		'html': message_html,
		'subject': subject,
		'from_email': from_email,
		'from_name': from_name,
		'to': [{
			'email': to_email,
			'name': to_name
		}],
		'important': false,
		'track_opens': true,
		'auto_html': false,
		'preserve_recipients': true,
		'merge': false,
		'tags': [
		'Fullstack_Tumblrmailer_Workshop'
		]
	};
	var async = false;
	var ip_pool = 'Main Pool';
	mandrill_client.messages.send({'message': message, 'async': async, 'ip_pool': ip_pool}, function(result){
		console.log(message);
		console.log(result);
	}, function(e){
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});
}

function csvParse(str){
	var newArr = [];
	var arrayForm = str.split('\n');
	var titles = arrayForm[0].split(',');
	return arrayForm.slice(1).filter(function(element){return element !== ''}).map(function(element){
			var newObj = {};
			var tempArr = element.split(',');
			for (var i = 0; i < tempArr.length; i++){
				newObj[titles[i]] = tempArr[i];
			}
			return newObj;
		});
}

var friends = csvParse(csvFile);
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

friends.forEach(function(element){
	var latestPosts = [];
	client.posts('jbarabander.tumblr.com', function(error, blog){
		blog.posts.forEach(function(post){
			var postTime = new Date(post.date);
			var currentTime = new Date();
			if(((currentTime - postTime)/86400000) <= 7){
				var postObj = {};
				postObj.href = post.post_url;
				postObj.title = post.title;
				latestPosts.push(postObj);
			}
		})
		element['latestPosts'] = latestPosts;
		var filledTemplate = ejs.render(emailTemplate, element);
		sendEmail(element.firstName + " " + element.lastName, element.emailAddress, 'Justin Barabander', 
				  'jbarabander@gmail.com', 'Tumblr Blog', filledTemplate);
	});
})




