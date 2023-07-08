const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = process.env.JWT_SECRET

 
router.post("/signup", (req, res) => {
	const {name, email, password, pic} = req.body;
	if(!name || !email || !password){
		return res.status(422).send({error : "all fields are not entered"});
	}
	User.findOne({email : email})
	.then((savedUser) => {
		if(savedUser){
			return res.status(422).send({"message" : "already exixted user"});
		}
		bcrypt.hash(password, 12)
		.then(hashedPassword => {
			const user = new User({
				name, email, password : hashedPassword,pic
			})
			user.save().then((user) => {
				return res.json({"message" : "saved user"});
			}).catch(err => {
				console.log(err);
			})

		})
	}).catch(err => {
		console.log(err)
	})
})

router.post("/signin", (req, res) => {
	const {email, password} = req.body;
	if(!email || !password) {
		return res.status(422).json({error : "please add email and password"})
	}
	User.findOne({email : email})
	.then(savedUser => {
		if(!savedUser){
			return res.status(422).json({error : "invalid email or password"})
		}
		bcrypt.compare(password, savedUser.password)
		.then(domatch => {
			if(domatch){
				const token = jwt.sign({_id : savedUser._id}, JWT_SECRET);
				const {_id, name, email,pic, followers, followings} = savedUser;
				res.json({token, user: {_id, name, email, pic, followers, followings}})
			}
			else{
				return res.status(422).json({error : "invalid email or password"})
			}
		})
	})
	.catch(err => {
		console.log(err);
	})
})
module.exports = router