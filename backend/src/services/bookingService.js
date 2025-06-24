import prisma from "../db/prisma.js";
import HttpError from "../utils/http-error.js";

const bookingService = {

  create: async (userId, accommodationId, bookingData) => {
    try {
      const accommodation = await prisma.accommodation.findUnique({
        where: { id: accommodationId },
      });

      if (!accommodation) {
        throw new HttpError('Accommodation not found', 404);
      }

      const numberOfNights = (new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24);
      if (numberOfNights <= 0) {
        throw new HttpError('Invalid date range', 400);
      }

      const totalPrice = accommodation.price * bookingData.numberOfGuests * numberOfNights;

      const newBooking = await prisma.booking.create({
        data: {
          userId,
          accommodationId,
          startDate: new Date(bookingData.startDate),
          endDate: new Date(bookingData.endDate),
          totalPrice,
          numberOfGuests: bookingData.numberOfGuests,
        },
      });
      return newBooking;
    } catch (error) {
      throw new HttpError('Failed to create booking: ' + error.message, 500);
    }
  },

  read: async (bookingId) => {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    return booking;
  },

  readAll: async (query) => {
    const {name, email} = query
    const allBookings = await prisma.booking.findMany({
      where: {
        AND: [
          name ? {user: { name: { contains: name, mode: "insensitive" } }} : undefined,
          email ? {user: { email: { contains: email, mode: "insensitive" } }} : undefined,
        ].filter(Boolean),
      },
      include:{
        user: true,
      },
    });
    return allBookings;
  },

  update: async (bookingId, bookingData) => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          accommodation: true,
        },
      });

      if (!booking) {
        throw new HttpError("Booking does not exist", 404);
      }

      const numberOfNights = (new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24);
      if (numberOfNights <= 0) {
        throw new HttpError("Invalid date range", 400);
      }

      const totalPrice = booking.accommodation.price * bookingData.numberOfGuests * numberOfNights;

      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: {
          startDate: new Date(bookingData.startDate),
          endDate: new Date(bookingData.endDate),
          totalPrice,
          numberOfGuests: bookingData.numberOfGuests,
        },
      });

      return updatedBooking;
    } catch (err) {
      throw new HttpError("Failed to update booking: " + err.message, 500);
    }
  },

  delete: async (bookingId) => {
    try {
      const deletedBooking = await prisma.booking.delete({
        where: { id: bookingId },
      });
      return deletedBooking;
    } catch (err) {
      throw new HttpError("Booking does not exist", 404);
    }
  },

  readAllByUser: async (userId) => {
    try {
      const allBookings = await prisma.booking.findMany({
        where: { userId },
        select: {
          id: true,
          startDate: true,
          endDate: true,
          totalPrice: true,
          numberOfGuests: true,
          accommodation: {
            select: {
              name: true,
              location: true,
              price: true,
              photos: true,
              description: true,
            },
          },
        },
      });
      return allBookings;
    } catch (err) {
      throw new HttpError("Bookings for this user do not exist", 404);
    }
  },
};

export default bookingService;
