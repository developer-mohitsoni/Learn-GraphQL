import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient({
	log: ["query", "error"],
	errorFormat: "pretty"
});

export default prisma;
