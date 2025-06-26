import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const header = req.headers;
    const token = header.token;

    if (!token) {
        res.status(403).json({ message: "Token required" });
        return;
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);

        const userId = data.userId;

        if (!userId) {
            res.status(403).json({ message: "You are not authorised" });
            return;
        }

        req.userId = userId;

        next();
    } catch (error) {
        console.log("Error in authmiddleware", error);
        res.status(403).json({ message: "You are not authorised" });
    }

}


export default authMiddleware;