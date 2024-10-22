import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_TODOS,
  GET_TODOS,
  TOGGLE_TODOS,
  DELETE_TODO,
} from "./queries/todoQuery";
import { Todo, TodoType } from "./types";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const { data, loading, error } = useQuery<TodoType>(GET_TODOS);
  const [createTodo, { data: newTodo, loading: cLoading, error: cError }] =
    useMutation(CREATE_TODOS);
  const [toggleComplete] = useMutation(TOGGLE_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);

  useEffect(() => {
    if (data?.todos) setTodos(data?.todos);
  }, [data]);

  useEffect(() => {
    if (newTodo && newTodo.createTodo)
      setTodos([newTodo?.createTodo, ...todos]);
  }, [newTodo]);

  const handleSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();
    createTodo({
      variables: { todo },
    });
    if (cError) alert(cError.message);
    setTodo("");
  };

  const handleToggle = async (data: boolean, id: number) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, completed: data } : item
    );

    toggleComplete({
      variables: { id, isCompleted: data },
    });

    setTodos(updatedTodos);
  };

  const handleDelete = async (id: number) => {
    deleteTodo({
      variables: { id },
    });
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          What's your plan for today?
        </h1>
        <form onSubmit={handleSubmitted} className="mb-6">
          <div className="flex items-center space-x-3">
            <input
              className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="text"
              placeholder="Enter a new task..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              disabled={cLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
              disabled={cLoading}
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-4 max-h-[40vh] overflow-y-auto">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error.message}</p>}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
            >
              <p
                className={`text-lg flex-1 truncate ${
                  todo.completed ? "line-through text-green-400" : ""
                }`}
              >
                {todo.todo}
              </p>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="h-6 w-6 text-blue-500 focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleToggle(e.target.checked, todo.id)}
                />
                <button
                  className="flex items-center justify-center h-6 w-6 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(todo.id)}
                  aria-label="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
