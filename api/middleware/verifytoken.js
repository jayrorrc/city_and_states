const jwt = require('jsonwebtoken');

const authConfig = require('../auth_config.json');
const key = authConfig.key
const securityHeader = authConfig.security_header

module.exports = (req, res, next) => {
    const token = req.headers[securityHeader];
    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Authorization failed',
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Authorization failed',
        });
    }
}
