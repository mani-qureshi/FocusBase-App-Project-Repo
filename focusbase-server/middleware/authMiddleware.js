
const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler'); // Using our level-up tool!

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check if Authorization header exists and starts with "Bearer"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 2. Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Attach user ID to the request object so routes can use it
            req.user = decoded;

            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

module.exports = { protect };



