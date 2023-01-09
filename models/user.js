const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	pic:{
		type:String,
		default:"https://res.cloudinary.com/dcf7v7xil/image/upload/v1673029851/download_thl4cl.jpg"
	},
	followers:[{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"User" 
	}],
	followings:[{
		type:mongoose.Schema.Types.ObjectId, 
		ref:"User" 
	}]
	
})
module.exports = mongoose.model("User", userSchema);