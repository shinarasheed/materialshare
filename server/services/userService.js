'use strict'
var mongoose = require('mongoose');
var async = require('async');
var UM = mongoose.model('User');


/**Get all users
  *@param callback function
*/
exports.getUsers = function(/*function*/callback){
    //Find all users
    UM.find({level:'100L'}, function(err, docs){
            if(err)
               // throw err
                return callback({state: 'failure', mesg: "Unable to retrive all users at this time"}, null)
            //If no error and users list found return list in {docs}
            return callback(null, {state: 'success', docs: docs});
    });
}


/**Get user by id
  *@param request
  *@param callback function
*/
exports.getUserById = function(/*object*/req, /*function*/callback){
    //Find user with id
    UM.findOne({_id:req.params.id},function(err, doc){
        if(err)
            return callback({state: 'failure', mesg: "Unable to retrive info at this time"}, null);
        //If no error and user found return user info in {doc}
        return callback(null, {state: 'success', doc: doc});
    })
}


/**Update user by id 
  *@param request
  *@param callback function
*/
exports.updateUserById = function(/*object*/req, /*function*/callback){
    //User info permitted to be updated
    var updatedInfo = {
            name: req.body.name,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            level:req.body.level
        }
    //Update user info with id
    UM.update({_id: req.params.id}, {$set:updatedInfo}, function(err){
            if(err)
                return callback({state: 'failure', mesg: "Unable to update at this time"}, null);
            //if no error and user info updated return success mesg
            return callback(null, {state: 'success', mesg: "Update Successfully"})
    });
}


/**Update user course list
  *@param request
  *@param callback function 
*/
exports.updateUserCourse = function(/*object*/req, /*function*/callback){
    var updatedInfo = {
        mycourseList: req.body.mycourseList
    }
    UM.update({_id: req.params.id}, {$set:updatedInfo}, function(err){
            if(err)
                return callback({state: 'failure', mesg: "Could not update course list at this time"}, null);
             //if no error and course list updated return success mesg                
            return callback(null, {state: 'success', mesg:'Course list updated'});
    });
}


/**Get user course list
  *@param request
  *@param callback function 
*/
exports.getUserCourseList = function(/**object */req, /**function */callback){
    UM.findOne({_id: req.params.id},function(err, doc){
        if(err)
            return callback({state: 'failure', mesg: "Could not update course list at this time"}, null);
        //If no error and course list retrived return course list in {doc}
        return callback(null, {state: 'success', doc: doc.mycourseList});
    });
}


/**Get all user
  *@param request
  *@param callback function 
*/
exports.deleteUser = function(/*object*/req, /*function*/callback){
    //Find and delete user with id
    UM.findOneAndRemove({_id:req.params.id}, function(err, res){
            if(err)
                //throw err
               return  callback({state: 'failure', mesg: "Unable to delete at this time"}, null);
            //If no error and user deleted return success mesg
            return callback(null, {state: 'success', mesg: "User Successfully deleted"});
    })
}
