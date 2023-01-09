const express = require("express")
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");
const Post = require("../models/post");

router.get("/allposts", requirelogin, (req, res) => {
	Post.find()
	.populate("postedBy", "_id name")
	.populate("comments.postedBy", "_id name")
	.then(result => {
		res.json({posts : result})
	})
	.catch(err => {
		console.log(err);
	})
})

router.get("/getposts", requirelogin, (req, res) => {
	Post.find({postedBy:{$in:req.user.followings}})
	.populate("postedBy", "_id name")
	.populate("comments.postedBy", "_id name")
	.then(result => {
		res.json({posts : result})
	})
	.catch(err => {
		console.log(err);
	})
})
router.get("/myposts", requirelogin, (req, res) => {
	Post.find({postedBy : req.user}).populate("postedBy", "_id name")
	.then(result => {
		res.json({post : result})
	})
	.catch(err => {
		console.log(err);
	})
})

router.post("/createpost", requirelogin, (req, res) => {
	const {title, body, imgUrl} = req.body;
	if(!title || !body || !imgUrl){
		return res.status(422).send({error : "please add all the fields"});
	}
	const post = new Post({
		title, body, imageUrl:imgUrl, postedBy : req.user._id
	})
	post.save().then(result => {
		res.status(200).send({"post" : result});
	})	
	.catch(err => {
		console.log(err);
	})
})
router.put("/comment",requirelogin,(req,res)=>{
	const comment = {
		text:req.body.text,
		postedBy:req.user._id
	}
	Post.findByIdAndUpdate(req.body.postId, {
		$push:{comments:comment}
	},{
		new:true
	})
	.populate("comments.postedBy", "_id name")
	.exec((err,resp)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		console.log(resp.comments);
		res.json(resp)
	})
})
router.put("/like",requirelogin,(req,res)=>{
	Post.findByIdAndUpdate(req.body.postId, {
		$push:{likes:req.user._id}
	},{
		new:true
	})
	.exec((err,resp)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		res.json(resp)
	})
})
router.put("/unlike",requirelogin,(req,res)=>{
	Post.findByIdAndUpdate(req.body.postId, {
		$pull:{likes:req.user._id}
	},{
		new:true
	}).exec((err,resp)=>{
		if(err){
			return res.status(422).json({error:err})
		}
		res.json(resp)
	})
})
router.delete("/delete/:postId",requirelogin, (req,res)=>{
	Post.findOne({_id:req.params.postId})
	.exec((err,post)=>{
		if(err || !post){
			return res.status(422).json({error:err})
		}
		if(post.postedBy._id.toString() === req.user._id.toString()){
			post.remove()
			.then(result => {
				res.json(result)
			})
			.catch(err => {
				console.log(err)
			})
		}
	})
})
router.delete("/deletecomment/:postId",requirelogin,(req,res)=>{
	Post.findByIdAndUpdate(req.params.postId, {
		$pull:{comments:{_id:req.body.cmntId}}
	}, {new:true})
	.exec((err, resp) => {
		if(err){
			return res.status(422).json({error:err})
		}
		res.json(resp)
	})
})
module.exports = router