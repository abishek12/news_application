// Import the jwt package
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Access Denied: No token provided",
            });
        }

        const privateKey = process.env.JWT_TOKEN;

        // Verify the token
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    status: 403,
                    message: "Invalid Token",
                });
            }

            req.user = decoded.data;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Error: ${error.message}`,
        });
    }
};
