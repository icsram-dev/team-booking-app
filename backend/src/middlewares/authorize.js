import { JWT_SECRET } from "../constants/base.js";
import HttpError from "../utils/http-error.js";
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        next(new HttpError('Bearer token is missing', 401))
    }

    const jwtToken = bearerToken.slice(7);

    jwt.verify(jwtToken, JWT_SECRET, (err, decoded) => {
        if (err) next(new HttpError('Invalid token', 401));
        req.user = { ...decoded };
        next();
    })
}