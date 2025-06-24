export default (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        next(new HttpError('Unauthorized access', 403));
        return;
    }

    next();
};