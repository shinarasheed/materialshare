var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	matricNum: String, //hash created from password
	password: String,
	name: String, 
	email:String,
	phoneNum: Number,
	dept:String,
	school:String,
	level: String,
	mycourseList: [],
	createdAt: {type: Date, default: Date.now}
})
var ClassMaterialSchema = new mongoose.Schema({
	courseCode: String,
	courseTitle: String,
	level: String,
	topic: String,
	description: String,
	type: String,
	downloadLink: String,
	uploadedBy: String,
	uploadedAt: {type: Date, default: Date.now},
	downloadNum: {type: Number, default: 0}
});

var ClassNoteSchema = new mongoose.Schema({
	noteTitle: String,
	noteBody: String,
	writtenBy: String,
	courseCode: String,
	writtenOn: {type: Date, default: Date.now},
	readersNum: {type:Number, default: 0}
})
mongoose.model('ClassMaterial', ClassMaterialSchema);
mongoose.model('ClassNote', ClassNoteSchema);
mongoose.model('User', userSchema);
