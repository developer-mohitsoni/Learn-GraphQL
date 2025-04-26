import type {
	ResponseType,
	Todo,
	TodoCompleted,
	TodoId,
	TodoIdandInput,
	TodoInput
} from "@/types/index.js";
import prisma from "../../config/database.js";

const todoResolver = {
	Query: {
		todos: async () =>
			await prisma.todo.findMany({
				orderBy: {
					id: "desc"
				}
			}),

		getTodo: async (_: any, { id }: TodoId): Promise<Todo> => {
			const todo = await prisma.todo.findUnique({
				where: {
					id
				}
			});

			if (!todo) {
				throw new Error(`Todo with id ${id} not found`);
			}

			return todo;
		}
	},
	Mutation: {
		createTodo: async (_: any, { todo }: TodoInput): Promise<Todo> => {
			const newTodo = await prisma.todo.create({
				data: {
					todo: todo,
					completed: false
				}
			});

			return newTodo;
		},

		updateTodo: async (
			_: any,
			{ id, todo }: TodoIdandInput
		): Promise<ResponseType> => {
			await prisma.todo.update({
				where: {
					id
				},
				data: {
					todo
				}
			});

			return {
				message: "Todo Updated Successfully!"
			};
		},

		toggleComplete: async (
			_: any,
			{ id, completed }: TodoCompleted
		): Promise<ResponseType> => {
			await prisma.todo.update({
				where: {
					id
				},
				data: {
					completed: completed
				}
			});

			return {
				message: "Todo Updated Successfully!"
			};
		},
		deleteTodo: async (_: any, { id }: TodoId): Promise<ResponseType> => {
			await prisma.todo.delete({
				where: {
					id
				}
			});

			return {
				message: "Todo Deleted Successfully!"
			};
		}
	}
};

export default todoResolver;
