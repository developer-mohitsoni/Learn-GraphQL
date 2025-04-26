import { readFileSync } from "node:fs";

const todoSchema = readFileSync("./todo.graphql", "utf-8");

export default todoSchema;
