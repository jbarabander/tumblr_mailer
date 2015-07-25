var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');

var client = tumblr.createClient({
  consumer_key: 'cuGcD2ygt53cFfiRTIOyiC2Fk2CNVjJ85AUUbsZ4QEuEFlMa3q',
  consumer_secret: '0qWlE0B6EkOkdDuRB0b19KHFV404QUnln6YL5XUDyxOK29ND4P',
  token: 'A8txXijaCgIIjqBeZNz1Mlne0EMRopzR2ocVd7ptDFBvQ8fs3h',
  token_secret: 'dDh4appYlWT4OdwUyXcHFpFdM8nKqHsbvhLLlHAQUOJc9yFv7K'
});

client.posts('jbarabander.tumblr.com', function(error, blog){
	console.log(blog);
});