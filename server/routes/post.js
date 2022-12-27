const express = require("express")
const router = express.Router();
const requirelogin = require("../middleware/requirelogin");
const Post = require("../models/post");

router.get("/allposts", (req, res) => {
	Post.find().populate("postedBy", "_id name")
	.then(result => {
		res.json({post : result})
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
		return res.status(422).send({"message" : "please add all the fields"});
	}
	const post = new Post({
		title, body, imageUrl:imgUrl, postedBy : req.user._id
	})
	post.save().then(result => {
		res.status(200).send({"post" : result});
	})	
	.then(err => {
		console.log(err);
	})
})

module.exports = router