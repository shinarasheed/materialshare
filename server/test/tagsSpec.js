var path = require('path');
var expect = require("chai").expect;
var zip = require("../services/zipfile");

describe("Zip", function(){
	describe("#_zipFiles2()", function(){
		it("All files should zip", function(done){
			this.timeout(0);
			var uploadDir = path.join(__dirname, '../uploads/class-materials');
			var FILES = [
					{filename: "1.pdf"},
				]
			var zippedpath = uploadDir+"/bdg203.zip";
			zip._zipFiles2(FILES, function(err){
				if(err){done(err)}else{done()}
			})
			

		});
	});
})


