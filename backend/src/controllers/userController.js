import userService from "../services/userService.js"
import authService from "../services/authService.js";

const userController = {

    post: async (req, res, next) => {
        try {
            const newUser = await userService.create(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            next(err);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const users = await userService.readAll(req.query);
            res.json(users);
        } catch (err) {
            next(err);
        }
    },

    get: async (req, res, next) => {
        try {
            const user = await userService.read(req.params.userId);
            res.json(user);
        } catch (err) {
            next(err);
        }
    },

    patch: async (req, res, next) => {
        try {
            const updatedUser = await userService.update(req.params.userId, req.body);
            res.json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            await userService.delete(req.params.userId);
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { oldPassword, newPassword } = req.body;
            await authService.changePassword(userId, oldPassword, newPassword);
            res.status(200).json({ message: 'Password updated successfully' });
        } catch (err) {
            next(err);
        }
    }
}

export default userController;
