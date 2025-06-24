import accommodationService from "../services/accommodationService.js"


const accommodationController = {
    post: async (req, res, next) => {
        try {
            const newAccommodation = await accommodationService.create(req.user.id, req.body);
            res.status(200).json({ ok: true, data: newAccommodation });
        } catch (err) {
            next(err);
        }
    },

    get: async (req, res, next) => {
        try {
            const accommodation = await accommodationService.read(req.params.accommodationId)
            res.json(accommodation);
        } catch (err) {
            next(err);
        }
    },

    getAll: async (req, res, next) => {
        try {
            const accommodations = await accommodationService.readAll(req.query)
            res.json(accommodations);
        } catch (err) {
            next(err);
        }
    },

    patch: async (req, res, next) => {
        try {
            const newAccommodation = await accommodationService.update(req.params.accommodationId, req.body)
            res.json(newAccommodation);
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            const deletedAccommodation = await accommodationService.delete(req.params.accommodationId)
            res.json(deletedAccommodation);
        } catch (err) {
            next(err);
        }
    },
}

export default accommodationController