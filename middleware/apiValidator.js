const jwt = require('jsonwebtoken');
const appConfig = require('../config/config.json');

exports.clientValidator = (req, res, next) => {
    if (appConfig.client_id == req.headers.client_id) {
        next();
    } else {
        return res.status(401).json({
            error: {
                "status_code": 401,
                "success": false,
                "message": "Invalid client request"
            }
        });
    }
};


exports.tokenValidator = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, appConfig.jwt_secreat_key)
        req.userData = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            error: {
                "error_code": 401,
                "success": false,
                "message": "Authentication failed"
            }
        });
    }
};