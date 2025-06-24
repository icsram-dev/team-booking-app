import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "../constants/base.js";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL,
        },
    },
});

export default prisma;
