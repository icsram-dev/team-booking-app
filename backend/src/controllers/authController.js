import authService from "../services/authService.js";

const authController = {
    register: async (req, res, next) => {
        try {
            const message = await authService.register(req.body)
            res.json(message)
        } catch (err) {
            next(err)
        }
    },

    login: async (req, res, next) => {
        try {
            const token = await authService.login(req.body)
            res.json(token)
        } catch (err) {
            next(err)
        }
    }
}

export default authController;