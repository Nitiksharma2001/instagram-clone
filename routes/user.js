const express = require("express")
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");
const Post = require("../models/post");
const User = require("../models/user");

router.get("/user/:id",requirelogin,(req,res)=>{
	User.findOne({_id:req.params.id})
	.select("-password")
	.then(user => {
		Post.find({"postedBy":req.params.id})
		.exec((err, posts)=>{
			if(err){
				return res.status(422).json({error:err})
			}
			res.json({user, posts})
		})
	})	
	.catch(err => console.log(err))
})
router.put("/follow",requirelogin,(req,res)=>{
	User.findByIdAndUpdate(req.body.followId, {
		$push:{followers:req.user._id}
	},{new:true})
	.exec((err, result)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		User.findByIdAndUpdate(req.user._id, {
			$push:{followings:req.body.followId}
		},{new:true})
		.select("-password")	
		.then(result => {
			res.json(result)
		})
		.catch(err => res.status(422).json({error:err}))
	})
})
router.put("/unfollow",requirelogin,(req,res)=>{
	User.findByIdAndUpdate(req.body.followId, {
		$pull:{followers:req.user._id}
	},{new:true})
	.exec((err, result)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		User.findByIdAndUpdate(req.user._id, {
			$pull:{followings:req.body.followId}
		},{new:true})
		.select("-password")	
		.then(result => {
			res.json(result)
		})
		.catch(err => res.status(422).json({error:err}))
	})
})

router.put("/updatepic", requirelogin, (req, res)=>{
	User.findByIdAndUpdate(req.user._id,{
		$set:{pic:req.body.pic}
	},{new:true}, (err, result)=>{
		if(err){
			return res.status(422).json({error:"pic cannot upload"})
		}
		return res.json(result)
	})
})
module.exports = router