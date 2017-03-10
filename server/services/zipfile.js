
/**

var uploadDir = path.join(__dirname, '../uploads/class-materials');
//set the multer storage engine
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
   filename: function (req, file, cb) {//rename file 
  	console.log("I was here filename");
    cb(null, file.fieldname+'- '+Date.now()+path.extname(file.originalname));
  }
});
var upload = multer({
	storage: storage,
	fileFilter: function(req, file,cb ){
  	  console.log("Filter was here");
  	  if(path.extname(file.originalname)=='.pdf'){
  	  	return cb(null, true);
  	  }else{
  	  	 cb(new Error('File type not allowed'))
  	  }

  }
}).array('materials', 12);
var zippedPath = uploadDir+"/bdg203.zip";

exports._zipFiles2 = function(req, res, callback){
	upload(req, res, function(err) {
        if(err) {
            console.log(err);
            return callback(err);
           }

        var output = fs.createWriteStream(zippedPath);
		var archive = archiver('zip');

		output.on('close', function(){
			console.log(archive.pointer() + ' total bytes');
			console.log('archiver has been finallized');
			
			async.each(req.files, function(file, cb){
				 //delete the files after zipping
				fs.unlink(uploadDir+'\/'+file.filename, function(err){
		        	if (err) {console.log(err)}
		        });
			}); 

			return callback();
		});

		archive.on('error', function(err){
			return callback(err);
		});	

		archive.pipe(output);

		async.each(req.files, function(file, cb){
			archive.file(uploadDir+'/'+file.filename, {name: file.filename});
		});
		archive.finalize();
    })
}


/**
exports._zipFiles2 = function(files, callback){
			var output = fs.createWriteStream(zippedPath);
			var archive = archiver('zip');
		   output.on('close', function(){
			console.log(archive.pointer() + ' total bytes');
			console.log('archiver has been finallized');
			
			async.each(req.files, function(file, cb){
				 //delete the files after zipping
				fs.unlink(path+'\/'+file.filename, function(err){
		        	if (err) {console.log(err)}
		        });
			}); 

			return callback();
		});

		archive.on('error', function(err){
			return callback(err);
		});	

		archive.pipe(output);

		async.each(files, function(file, cb){
			archive.file(uploadDir+'/'+file.filename, {name: file.filename});
		});
		archive.finalize();
}
*/

				