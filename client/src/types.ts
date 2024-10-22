export interface Todo {
  _typename: string;
  id: number;
  completed: boolean;
  todo: string;
  created_at: string;
}

export interface TodoType {
  todos: Todo[];
}
