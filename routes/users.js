const express = require('express');
const router = express.Router();

const db = require('../conf');

//:id? means id is option parameter req.params are all params
router.get('/signup/:id?', function(req, res, next){
	// console.log(req.body.id);
	
	console.log(req.params.id || null);
	res.render('signup', {
		title: 'Welcome to Express Game portal',
		subTitle: 'Create account right now'
	});
});

router.post('/signup', function(req, res, next){
	// console.log(req.body.id);
	console.log(req.body);
	var retObj = {
		title: 'Welcome to Express Game portal ' + req.body.username ,
		subTitle: 'Create account right now'
	};
	var reqArr = new Array('username', 'password1', 'password2', 'signin');
	var retError = new Array();
	
	for (var name of reqArr){
		if(undefined === req.body[name]){
			console.log(`Error: field ${name} is required`);
			retError.push(`Error: field ${name} is required`);
		}
	}
	/* if error detected stop here and render page*/
	if(retError.length > 0){
		retObj.error = true;
		res.render('signup', retObj);
		return;
	}

	// console.log(req.session);
	db.query("INSERT INTO users (username, password) VALUES (?, ?)",
		new Array(req.body.username, req.body.password1), (e, qres) => {
			if(!e){
				if(qres.insertId){
					// console.log(qres);
					retObj.success = true;
					console.log('saved data in db');
				}else{
					retObj.error = true;
					console.log('error db record didn\'t create');
				}
			}else{
				console.log('error in saving data');
				retObj.error = true;
			}
			res.render('signup', retObj);
		});
});


//logout function
router.get('/signout', function(req, res, next){
	req.session.destroy();
	res.redirect('/');
	console.log('session has been destroied');
});


/* IF there is no above described urls 
then it displays 404 page */
router.get('/*', function(req, res, next) {
  res.send('nothing is here');
});

module.exports = router;
