var express = require('express');
var router = express.Router();

const db = require('../conf');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session)
	res.render('index', { 
		title: 'Welcome to Express Game portal',
		subTitle: 'Please Login to get access or create account right now'
	});
});

router.post('/', function(req, res, next) {
	// req.session.email = 'nimda@gmail.com';
	db.query("SELECT * FROM users WHERE username = ? AND password = ?",
		new Array(req.body.username, req.body.password), 
		(error, result) => {
			if(!error){
				console.log(result.length);
				if(result.length !== 0){
					console.log(`Welcome dear ${req.body.username}`);
					req.session.userData = {
						'userId':   result[0]['user_id'],
						'username': result[0]['username']
					};
					res.redirect('/main');
					return;
				}else{
					console.log('Wrong credentials');
					res.render('index', { 
						title: 'Welcome to Express Game portal',
						subTitle: 'Please Login to get access or create account right now',
						error: 'Incorrect combination'
					});
				}
			}else{
				console.log('Error in selecting data: login page');
			}
		});
});

module.exports = router;
