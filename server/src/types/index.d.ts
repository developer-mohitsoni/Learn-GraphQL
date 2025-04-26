export interface Todo {
	id: number;
	todo: string;
	completed: boolean;
	created_at: Date;
}

export type TodoId = Pick<Todo, "id">;
export type TodoInput = Pick<Todo, "todo">;
export type TodoIdandInput = Pick<Todo, "id" | "todo">;
export type TodoCompleted = Pick<Todo, "id" | "completed">;

export type ResponseType = {
	message: string;
};
