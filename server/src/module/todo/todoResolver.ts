import prisma from "../../config/database.js";

const todoResolver = {
  Query: {
    todos: async () =>
      await prisma.todo.findMany({
        orderBy: {
          id: "desc",
        },
      }),
  },
};

export default todoResolver;
