import HttpError from "../utils/http-error.js";
import bcrypt from 'bcrypt';
import prisma from "../db/prisma.js";
import { JWT_SECRET } from "../constants/base.js";
import jwt from 'jsonwebtoken'

const authService = {
    register: async ({ name, phoneNumber, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 5);
        try {
            console.log(email);
            const dbUser = await prisma.user.create({
                data: { name, phoneNumber, email, password: hashedPassword }
            });
            return {
                ok: true,
                user: {
                    id: dbUser.id,
                    name,
                    phoneNumber,
                    email,
                    isAdmin: dbUser.isAdmin,
                    isSubscribedToNewsletter: dbUser.isSubscribedToNewsletter,
                    myAccommodations: dbUser.myAccommodations,
                    favourites: dbUser.favourites,
                    bookings: dbUser.bookings,
                    createdAt: dbUser.createdAt,
                    updatedAt: dbUser.updatedAt,
                },
                message: "Sikeres regisztráció"
            }
        } catch (err) {
            console.log(err);
            throw new HttpError('User already exist', 409)
        }
    },

    login: async ({ email, password }) => {
        const dbUser = await prisma.user.findUnique({
            where: { email }
        });
        if (!dbUser) {
            throw new HttpError('Invalid email/password', 403)
        };
        if (await bcrypt.compare(password, dbUser.password)) {

            const token = jwt.sign({
                id: dbUser.id,
                name: dbUser.name,
                phoneNumber: dbUser.phoneNumber,
                email,
                isAdmin: dbUser.isAdmin,
                isSubscribedToNewsletter: dbUser.isSubscribedToNewsletter,
                myAccommodations: dbUser.myAccommodations,
                favourites: dbUser.favourites,
                bookings: dbUser.bookings,
                createdAt: dbUser.createdAt,
                updatedAt: dbUser.updatedAt,
            }, JWT_SECRET)

            return { token }
        }
        throw new HttpError('Invalid email/password', 403)
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

}
export default authService;