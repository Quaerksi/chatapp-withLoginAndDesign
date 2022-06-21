const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    if (!token) {
        console.log(`Error: A token is required for authentication`)
        return res.status(403).redirect('/');
    }
    try {
        //verify token
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.nickname = decoded.nickname;
        return next();
        
    } catch (err) {
        console.log(`Error: Invalid Token`)
        return res.status(401).redirect('/');
    }
}

module.exports = verifyToken;
