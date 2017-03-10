'use strict';
var express = require('express');
var router = express.Router();
/**
 * Custom Service Modules
 * 		MS - Material Service
 * 		NS - Note Service
 * 		US - User Service
 */
var MS = require('../services/materialService');
var NS = require('../services/noteService');
var US = require('../services/userService');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}
	// if the user is not authenticated then redirect him to the login page
	return res.send({state: 'login-failure', mesg: 'Unable to perform request. Kindly login'});
};

//Register the authentication middleware
router.use('/upload/materials', isAuthenticated);
router.use('/materials/:id', isAuthenticated);
router.use('/post/note', isAuthenticated);
router.use('/note/:id', isAuthenticated);
router.use('/user',isAuthenticated);
router.use('/user/:id', isAuthenticated);
router.use('/user/mycourse', isAuthenticated);

/**
 * Material API
 * 
 */
 router.route('/upload/materials')
		//Post a material
		.post(function(req, res) {
			MS.postMaterials(req, res, function(err, mesg){
				if(err)
					res.send({message:err});
				res.send({message: mesg});
			})
		})
		//Get the all materials
		.get(function(req, res){
			MS.getMaterials(req,function(err, materials){
				if(err)
					res.send({message: err});
				res.send(materials);
			});
		})
//Material api call with id
router.route('/materials/:id')		
		//Get a material with id
		.get(function(req, res){
			 MS.getMaterialsById(req.params.id, function(err, material){
				 if(err)
					 res.send({message: err});
				 res.send(material);
			 })
		})
		//Update material details with id
		.put(function(req, res){
			MS.updateMaterial(req, function(err, mesg){
				if(err)
					res.send({message:err});
				res.send({message: mesg});
			})	
		})
		//delete material material with id
		.delete(function(req, res){
			MS.deleteMaterial(req, function(err, mesg){
				if(err)
					res.send({message: err});
				res.send({message: mesg})
			})
		});


/**
 * Note API
 */
router.route('/note')
	//Post a note
	.post(function(req, res){
		NS.postNote(req, function(err, mesg){
			if(err)
				res.send(err);
			res.send(mesg);
		})
	})
	//Get  all notes
	.get(function(req, res){
		NS.getNotes(req,function(err, docs){
				if(err)
					res.send(err);
				res.send(docs)
		});
	});
router.route('/note/:id')
	//Get note with id
	.get(function(req, res){
		NS.getNoteById(req, function(err, doc){
			if(err)
				res.send(err);
			res.send(doc);
		})
	})
	//Update note with id
	.put(function(req, res){
		NS.updateNoteById(req, function(err, mesg){
			if(err)
				res.send(err);
			 res.send(mesg)
		})
	})
	//Delete note with id
	.delete(function(req, res){
		NS.deleteNote(req, function(err, mesg){
			if(err)
				res.send(err);
			res.send(mesg)
		})
	})

/**
 * Users API
 */
router.route('/user')
	//Get  all users
	.get(function(req, res){
		US.getUsers(function(err, docs){
				if(err)
					res.send(err);
				res.send(docs)
		})
	});
router.route('/user/:id')
	//Get user with id
	.get(function(req, res){
		US.getUserById(req, function(err, doc){
			if(err)
				res.send(err);
			res.send(doc);
		})
	})
	//Update user with id
	.put(function(req, res){
		US.updateUserById(req, function(err, mesg){
			if(err)
				res.send(err);
			 res.send(mesg)
		})
	})
	//Delete user with id
	.delete(function(req, res){
		US.deleteUser(req, function(err, mesg){
			if(err)
				res.send(err);
			res.send(mesg)
		})
	})
	
router.route('/user/mycourse/:id')
	//Get user with id course list
	.get(function(req, res){
		US.getUserCourseList(req, function(err, doc){
			if(err)
				res.send(err);
			res.send(doc);
		});
	})
	//Update user with id course list	
	.put(function(req, res){
		US.updateUserCourse(req, function(err, mesg){
			if(err)
				res.json(err);
			res.json(mesg);
		});
	})

module.exports = router;
