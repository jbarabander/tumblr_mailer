var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');

var csvFile = fs.readFileSync('friend_list.csv', 'utf8');

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

// Pure for loop implementation
// function csvParse(str){
// 	var newArr = [];
// 	var arrayForm = str.split('\n');
// 	var titles = arrayForm[0].split(',');
// 	for (var i = 1; i < arrayForm.length; i++) {
// 		if(arrayForm[i] !== '') {
// 			//this is here to prevent accidentally hitting return as being mistaken for an entry
// 			var newObj = {};
// 			var tempArr = arrayForm[i].split(',');
// 			for(var j = 0; j < tempArr.length; j++) {
// 				newObj[titles[j]] = tempArr[j];
// 			}
// 			newArr.push(newObj);
// 		};
// 	}
// 	return newArr;
// }

var friends = csvParse(csvFile);
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

friends.forEach(function(element){
	var filledTemplate = ejs.render(emailTemplate, element);
	console.log(filledTemplate);
})


