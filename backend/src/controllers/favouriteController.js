import favouriteService from '../services/favouriteService.js';

const favouriteController = {

    getFavourites: async (req, res, next) => {
        try {
            const user = await favouriteService.readFavourites(req.user.id);
            res.json(user.favourites);
        } catch (err) {
            next(err);
        }
    },

    addFavourite: async (req, res, next) => {
        try {
            const { accommodationId } = req.params;
            const updatedUser = await favouriteService.addFavourite(req.user.id, accommodationId);
            res.json(updatedUser);
        } catch (err) {
            next(err);
        }
    },

    removeFavourite: async (req, res, next) => {
        try {
            const { accommodationId } = req.params;
            const updatedUser = await favouriteService.removeFavourite(req.user.id, accommodationId);
            res.json(updatedUser);
        } catch (err) {
            next(err);
        }
    }
};

export default favouriteController;