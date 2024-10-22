import prisma from "../../config/database.js";

const todoResolver = {
  Query: {
    todos: async () =>
      await prisma.todo.findMany({
        orderBy: {
          id: "desc",
        },
      }),

    getTodo: async (_, { id }) => {
      return await prisma.todo.findUnique({
        where: {
          id,
        },
      });
    },
  },
  Mutation: {
    createTodo: async (_, { todo }) => {
      const newTodo = await prisma.todo.create({
        data: {
          todo: todo,
          completed: false,
        },
      });

      return newTodo;
    },

    updateTodo: async (_, { id, todo }) => {
      await prisma.todo.update({
        where: {
          id,
        },
        data: {
          todo,
        },
      });

      return {
        message: "Todo Updated Successfully!",
      };
    },
  },
};

export default todoResolver;
