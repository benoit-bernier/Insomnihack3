const UserModel = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const fs = require ('fs')

const privateKey = fs.readFileSync('./config/privateKey.pem')
const publicKey = fs.readFileSync('./config/publicKey.pem')

exports.isAuth = (req, res, next) => {
	let token = getToken(req.headers);
	if(!token) return res.status(401).send({success: false, errorMessage: "Unauthorized"});
	else {
		jwt.verify(token, publicKey, (err, decodedToken) => {
			if(err) return res.status(401).send({success: false, errorMessage: 'Token is invalid'});
			else {
				req.apiToken = decodedToken;
				next();
			}
		})
	}
};

exports.login = (req, res) => {
		UserModel.findOne({
			$or:[
				{username: req.body.username},
				{mail : req.body.mail}
				]
		}, (err, user) => {
		if(err) throw err;
		if(!user) return res.send({success: false, errorMessage: 'Utilisateur ou mot de passse incorrect'});
		else {
			user.validPassword(req.body.password, (err, isMatch) => {
				if(!isMatch || err) return res.send({success: false, errorMessage: 'Utilisateur ou mot de passse incorrect'});
				else {
					let token = jwt.sign(user.toJSON(), privateKey, config.signOptions);
					return res.status(200).send({success: true, token: 'JWT ' + token, tokenExpiresIn : config.signOptions.expiresIn,"admin": user.admin});
				}
			})
		}
	});
};

exports.logout = (req, res) => {
	return res.status(200).send({success: false, token: null})
};

getToken = headers => {
	if (headers.authorization) {
		let parted = headers.authorization.split(' ');
		if(parted.length >= 1){
			return parted[parted.indexOf('JWT')+1];
		} 
		else return null;
	}
	else return null;
};
