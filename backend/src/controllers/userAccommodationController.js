import userAccommodationService from "../services/userAccommodationService.js";

const userAccommodationController = {
    
    getAll: async (req, res, next) => {
        try {
            const accommodations = await userAccommodationService.readAll(req.user.id, req.query)
            res.json(accommodations);
        } catch (err) {
            next(err);
        }
    },

    patch: async (req, res, next) => {
        try {
            const newAccommodation = await userAccommodationService.update(req.user.id, req.params.accommodationId, req.body)
            res.status(200).json({ ok: true, data: newAccommodation });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const deletedAccommodation = await userAccommodationService.delete(req.user.id, req.params.accommodationId)
            res.status(200).json({ ok: true, data: deletedAccommodation });
        } catch (err) {
            next(err);
        }
    },
}

export default userAccommodationController