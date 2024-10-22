import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "./queries/todoQuery";
import { TodoType } from "./types";

const App = () => {
  const [todo, setTodo] = useState("");

  const { data, loading, error } = useQuery<TodoType>(GET_TODOS);

  const handleSubmitted = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send the todo to your GraphQL API

    console.log("The todo is: " + todo);
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
          />
        </form>

        <div className="h-[50vh] mt-5">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-300">{error.message}</p>}

          {data &&
            data?.todos.map((todo) => (
              <div
                key={todo.id}
                className="flex justify-between items-center bg-blue-400 rounded-md p-1 px-4 mb-2"
              >
                <p>{todo.todo}</p>
                <input type="checkbox" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
