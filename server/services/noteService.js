'use strict'
var mongoose = require('mongoose');
var async = require('async');
var NM = mongoose.model('ClassNote');
/**
 * Post a note
 * @param {object} request 
 * @param {function} callback function
 * 
 * @return {string} 
 */
exports.postNote = function(req, callback){
    var newNM = new NM();
    newNM.noteTitle = req.body.noteTitle;
	newNM.noteBody = req.body.noteBody;
    newNM.courseCode = req.body.courseCode;
	newNM.writtenBy = req.body.writtenBy;
    //Add new note to DB
    newNM.save(function(err){
            if(err)
                //throw err
                callback("Could not save at this time", null);       
            return callback(null, 'Successfully Saved...');    
        })
}
/**
 * Get Notes
 * @param {function} callback
 * 
 * @return {object} 
 */
exports.getNotes = function(req, callback){
    var userCourses = JSON.parse(req.query.userCourses);
    NM.find({courseCode:{$in:userCourses}}, function(err, docs){
        if(err){
            return callback({state: 'failed', mesg: "Unable to retrive materials at this time."}, null)
        }
        return callback(null,{state: 'success', docs: docs});
    });
}
/**
 * Get note by id
 * @param {object} req
 * @param {function} callback
 * 
 * @return {object}
 */
exports.getNoteById = function(req, callback){
    //Find the note with the id and update the numbers of readers
    NM.findOneAndUpdate({_id:req.params.id},{$inc:{readersNum: 1}}, {new:true},function(err, doc){
        if(err)
            //throw err
            callback("Could not get note at this time", null);
        return callback(null, doc)
    })
}
/**
 * Update Note by id
 *  @param {object} req
 *  @param {function} callback
 * 
 *  @return {string}
 */
exports.updateNoteById = function(req, callback){
    //Note details permitted to be updated
    updatedInfo = {
            noteTitle: req.body.noteTitle,
            noteBody: req.body.noteBody,
            courseCode: req.body.courseCode
        }
    //Update materials with id
    NM.update({_id: req.params.id}, {$set:updatedInfo}, function(err){
            if(err)
                //throw err
                callback("Could not update info at this time", null);
            callback(null, "Successfully updated..")
    });
}
/**
 * Delete a note
 * @param {object} req
 * @param {function} callback
 * 
 * @return {string}
 */
exports.deleteNote = function(req, callback){
    //Find and delete note with the id
    NM.findOneAndRemove({_id:req.params.id}, function(err, res){
            if(err)
                //throw err
                callback("Could not delete Account now", null)
            callback(null, "Successfully deleted....")
    })
}
