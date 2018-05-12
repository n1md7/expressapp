var express = require('express');
var router = express.Router();

const db = require('../conf');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.userData){
		console.log('User has been kicked out');
		res.redirect('/');
	}else{
		res.render('main', { 
			message: `Session has been set`,
			user: req.session.userData,
			title: 'Welcome to Express Game portal',
			subTitle: 'Please Login to get access or create account right now'
		});
	}
});

module.exports = router;
