import prisma from "../db/prisma.js";
import HttpError from "../utils/http-error.js";
import bcrypt from 'bcrypt'

const userService = {
  create: async (newUserData) => {
    const hashedPassword = await bcrypt.hash(newUserData.password, 5);
    const newUser = await prisma.user.create({
        data: {
            name: newUserData.name,
            phoneNumber: newUserData.phoneNumber,
            email: newUserData.email,
            password: hashedPassword,
            isAdmin: newUserData.isAdmin,
            isSubscribedToNewsletter: newUserData.isSubscribedToNewsletter,
            myAccommodations: newUserData.myAccommodations,
            favourites: newUserData.favourites,
            bookings: newUserData.bookings
          }
    });
    return newUser;
  },

  read: async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user || user.isDeleted) {
        throw new HttpError('User not found', 404);
    }
    return user;
},

  readAll: async (query) => {
    const { name, email } = query;
    const allUsers = await prisma.user.findMany({
      where: { 
        AND: [
          { isDeleted: false },
          name ? { name: { contains: name, mode: "insensitive" } } : undefined,
          email ? { email: { contains: email, mode: "insensitive" } } : undefined,
      ].filter(Boolean),
       }
    });
    return allUsers;
  },

  update: async (userId, newUserData) => {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: newUserData,
      });
      return updatedUser;
    } catch (err) {
      throw new HttpError("User does not exist", 404);
    }
  },

  delete: async (userId) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          myAccommodations: true,
          bookings: true,
        },
      });

      if (!user) {
        throw new HttpError('User not found', 404);
      }
      
      if (user.myAccommodations.length > 0 || user.bookings.length > 0) {
        await prisma.booking.deleteMany({
          where: { userId: userId },
        });
        await prisma.accommodation.deleteMany({
          where: { ownerId: userId },
        });
      }
      
      await prisma.user.update({
        where: { id: userId },
        data: { isDeleted: true },
      });

    } catch (err) {
      throw new HttpError('Failed to delete user', 500);
    }
  },

  changePassword: async (userId, oldPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect) {
        throw new HttpError('Incorrect old password', 400);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 5);
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
    });
}
};

export default userService;