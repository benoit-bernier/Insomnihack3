require('dotenv').config()

module.exports = {
	url: process.env.MONGODB_URL,
	signOptions: {
		expiresIn: process.env.SESSION_TOKEN_TIME,
		algorithm : "RS256"
	}
};