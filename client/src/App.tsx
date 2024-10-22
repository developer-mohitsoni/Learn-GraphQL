import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");

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
      </div>
    </div>
  );
};

export default App;
