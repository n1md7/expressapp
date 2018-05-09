var mysql = require('mysql');

var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "express"
});

db.connect(function(DBerror) {
	if (DBerror){
		console.log(DBerror);
		return;
	}else{
		console.log('DB connected')
	}
});

module.exports = db;
