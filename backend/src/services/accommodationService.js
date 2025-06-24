import prisma from "../db/prisma.js";
import HttpError from "../utils/http-error.js";

const accommodationService = {
  create: async (ownerId, newAccommodationData) => {

    const newAccommodation = await prisma.accommodation.create({
        data: {
            name: newAccommodationData.name,
            location: newAccommodationData.location,
            type: newAccommodationData.type,
            description: newAccommodationData.description,
            price: newAccommodationData.price,
            services: newAccommodationData.services, 
            photos: newAccommodationData.photos, 
            ownerId: ownerId,
            isVisible: newAccommodationData.isVisible,
          },

    });

    return newAccommodation;
  },

  read: async (accommodationId) => {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: accommodationId },
    });

    return accommodation;
  },

  readAll: async (query) => {

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

  update: async (accommodationId, newAccommodationData) => {

    try {
      const updatedAccommodation = await prisma.accommodation.update({
        where: { id: accommodationId },
        data: newAccommodationData,
      });
      return updatedAccommodation;
    } catch (err) {
      throw new HttpError("accommodation does not exist", 404);
    }
  },

  delete: async (accommodationId) => {
    try {
      const deletedAccommodation = await prisma.accommodation.delete({
        where: { id: accommodationId },
      });
      return deletedAccommodation;
    } catch (err) {
      throw new HttpError("Accommodation does not exist", 404);
    }
  },
};

export default accommodationService;
