import prisma from '../db/prisma.js'
import HttpError from "../utils/http-error.js";

const userAccommodationService = {

    readAll: async (ownerId, query) => {
        const {
            page = 1,
            limit = 5,
            search,
            minPrice,
            maxPrice,
            orderBy = 'createdAt',
            order = 'asc',
            location,
            type,
            services
        } = query;

        let pageNumber = Number(page);
        let limitNumber = Number(limit);
        const minPriceNumber = Number(minPrice);
        const maxPriceNumber = Number(maxPrice);

        const locations = location ? location.split(',') : [];
        const types = type ? type.split(',') : [];

        const where = {
            ownerId,
            AND: [
                locations.length ? { OR: locations.map(loc => ({ location: { contains: loc, mode: "insensitive" } })) } : undefined,
                types.length ? { OR: types.map(t => ({ type: { contains: t, mode: "insensitive" } })) } : undefined,
                minPriceNumber ? { price: { gte: minPriceNumber } } : undefined,
                maxPriceNumber ? { price: { lte: maxPriceNumber } } : undefined,
                services ? { services: { hasSome: services.split(',') } } : undefined,
                search ? { name: { contains: search, mode: "insensitive" } } : undefined,
            ].filter(Boolean),
        };

        const numberOfAccommodation = await prisma.accommodation.count({ where });
        if (limitNumber > numberOfAccommodation) limitNumber = numberOfAccommodation;

        const totalPages = Math.ceil(numberOfAccommodation / limitNumber);
        if (pageNumber > totalPages) pageNumber = totalPages;

        const allAccommodation = await prisma.accommodation.findMany({
            skip: (pageNumber - 1) * limitNumber,
            take: limitNumber,
            where,
            orderBy: { [orderBy]: order },
        });

        return { accommodations: allAccommodation, totalPages };
    },

    update: async (ownerId, accommodationId, newAccommodationData) => {

        try {
            const updatedAccommodation = await prisma.accommodation.update({
                where: { ownerId: ownerId, id: accommodationId },
                data: newAccommodationData,
            });
            return updatedAccommodation;
        } catch (err) {
            console.error(`Error updating accommodation:`, err);
            throw new HttpError("accommodation does not exist", 404);
        }
    },

    delete: async (ownerId, accommodationId) => {
        try {
            const deletedAccommodation = await prisma.accommodation.delete({
                where: { ownerId, id: accommodationId },
            });
            return deletedAccommodation;
        } catch (err) {
            throw new HttpError("Accommodation does not exist", 404);
        }
    },
};

export default userAccommodationService;