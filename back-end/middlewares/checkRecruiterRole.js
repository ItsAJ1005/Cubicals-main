const jwt = require('jsonwebtoken');

async function checkRecruiterRole(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers['jwt'];

        console.log("token", token);
        if (!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            console.log("decoded", decoded);
            if (err) {
                console.log("error auth", err);
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id;
            req.userEmail = decoded.email;
            req.role = decoded.role;
            console.log("Role:", req.role);

            if (req.role !== 'recruiter') {
                return res.status(403).json({
                    message: "Access denied. Insufficient permissions.",
                    error: true,
                    success: false
                });
            }

            next();
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = checkRecruiterRole;