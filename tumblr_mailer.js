var fs = require('fs');

var csvFile = fs.readFileSync('friend_list.csv', 'utf8');
console.log(csvFile);

function csvParse(str){
	var newArr = [];
	var arrayForm = str.split('\n');
	var titles = arrayForm[0].split(',');
	for (var i = 1; i < arrayForm.length; i++) {
		var newObj = {};
		var tempArr = arrayForm[i].split(',');
		for(var j = 0; j < tempArr.length; j++){
			 newObj[titles[j]] = tempArr[j]; 
		}
		newArr.push(newObj);
	};
	return newArr;
}

console.log(csvParse(csvFile));