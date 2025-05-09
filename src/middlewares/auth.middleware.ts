// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (authHeader && authHeader.startsWith("Bearer ")) {
		const token = authHeader.split(" ")[1];

		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			(req as any).user = decoded;
			next();
		} catch (err) {
			res.status(403).json({ message: "Invalid or expired token" });
			return;
		}
	} else {
		res.status(401).json({ message: "Authorization header missing" });
		return;
	}
};
