import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_TODOS, GET_TODOS, TOGGLE_TODOS } from "./queries/todoQuery";
import { Todo, TodoType } from "./types";

const App = () => {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  const { data, loading, error } = useQuery<TodoType>(GET_TODOS);
  const [createTodo, { data: newTodo, loading: cLoading, error: cError }] =
    useMutation(CREATE_TODOS);

  const [toggleComplete] = useMutation(TOGGLE_TODOS);

  useEffect(() => {
    if (data?.todos) setTodos(data?.todos);
  }, [data]);

  useEffect(() => {
    // console.log("The newTodo from Effect is: " + newTodo);

    if (newTodo && newTodo.createTodo)
      setTodos([newTodo?.createTodo, ...todos]);
  }, [newTodo]);

  const handleSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send the todo to your GraphQL API

    createTodo({
      variables: {
        todo: todo,
      },
    });

    if (cError) alert(cError.message);

    // console.log("The newTodo from handleSubmit is: " + newTodo);

    setTodo("");
    // console.log("The todo is: " + todo);
  };

  const handleToggle = async (data: boolean, id: number) => {
    console.log("data", data, id);

    const updateTodos = todos.map((item) => {
      if (item.id === id) return { ...item, completed: data };
      else return item;
    });

    toggleComplete({
      variables: {
        id: id,
        isCompleted: data,
      },
    });

    setTodos(updateTodos);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      <div className="w-full px-2 md:w-[600px] rounded-md bg-blue-100 h-[60vh]">
        <h1 className="text-xl font-bold my-2">
          What's you are doing today ?{" "}
        </h1>
        <form onSubmit={handleSubmitted}>
          <input
            className="w-full h-10 p-2 outline-none rounded-md"
            type="text"
            placeholder="Enter your todo here..."
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            disabled={cLoading}
          />
        </form>

        <div className="h-[50vh] mt-5">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-300">{error.message}</p>}

          {data &&
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center bg-black rounded-md p-1 px-4 py-4 mb-2 text-white"
              >
                <p
                  className={`${
                    todo.completed ? "line-through text-green-400" : ""
                  }`}
                >
                  {todo.todo}
                </p>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="h-6 w-6 scale-x-110"
                  onChange={(e) => {
                    handleToggle(e.target.checked, todo.id);
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
