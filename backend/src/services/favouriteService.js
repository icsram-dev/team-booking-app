import prisma from "../db/prisma.js";
import HttpError from "../utils/http-error.js";

const favouriteService = {

    readFavourites: async (userId) => {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include:{
                favourites: true
            } 
        });
        if (!user) {
            throw new HttpError('User not found', 404);
        }
        return user;
    },

  addFavourite: async (userId, accommodationId) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favourites: {
                    connect: { id: accommodationId }
                }
            }
        });
        return updatedUser;
    } catch (err) {
        throw new HttpError("Accommodation or user does not exist", 404);
    }
},

removeFavourite: async (userId, accommodationId) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                favourites: {
                    disconnect: { id: accommodationId }
                }
            }
        });
        return updatedUser;
    } catch (err) {
        throw new HttpError("Accommodation or user does not exist", 404);
    }
}
};

export default favouriteService;