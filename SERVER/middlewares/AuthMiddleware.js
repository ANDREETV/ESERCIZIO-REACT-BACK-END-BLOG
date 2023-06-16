const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.APP_JWT_SECRET_KEY;

const auth = (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        const err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    } else {
        token = token.split(' ')[1];
        jwt.verify(token, jwtSecretKey, (err, data) => {
            if(err) {
                //return res.status(401).json({error: 'Invalid token'}) 
                err.message = 'Invalid token'; // di default 'invalid signature'
                err.status = 401;
                next(err)
            } else {
                console.log(data)
            }
        })
    }
    next()
}

module.exports = auth;
