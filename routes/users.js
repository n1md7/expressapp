const express = require('express');
const router = express.Router();

const db = require('../conf');


//:id? means id is option parameter req.params are all params
router.get('/signup/:id?', function(req, res, next){
	// console.log(req.body.id);
	
	console.log(req.params.id || null);
	res.render('signup', {
		title: 'Welcome to Express Game portal',
		subTitle: 'Create account right now '+req.session.email
	});
});


router.post('/signup', function(req, res, next){
	// console.log(req.body.id);
	console.log(req.body);
	// console.log(req.session);
	db.query("INSERT INTO users (username, password) VALUES (?, ?)",
		new Array(req.body.username, req.body.password1), (e, res) => {
			if(!e){
				console.log(res);
				console.log(res.insertId);
			}else{
				console.log('error in saving data');
			}
		});
	res.render('signup', {
		title: 'Welcome to Express Game portal ' + req.body.username ,
		subTitle: 'Create account right now'
	});
});


/* IF there is no above described urls 
then it displays 404 page */
router.get('/*', function(req, res, next) {
  res.send('nothing is here');
});

module.exports = router;
