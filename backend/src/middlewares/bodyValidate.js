import { ValidationError } from 'yup';

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json({
                errors: err.errors,
            });
        } else {
            next(err);
        }
    }
};

export default validate;
