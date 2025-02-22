import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  #graphql
  query GET_TODOS {
    todos {
      id
      completed
      todo
      created_at
    }
  }
`;

export const CREATE_TODOS = gql`
  #graphql
  mutation CREATE_TODOS($todo: String!) {
    createTodo(todo: $todo) {
      id
      todo
      completed
      created_at
    }
  }
`;

export const TOGGLE_TODOS = gql`
  #graphql
  mutation TOGGLE_TODOS($id: Int!, $isCompleted: Boolean!) {
    toggleComplete(id: $id, isCompleted: $isCompleted) {
      message
    }
  }
`;

export const DELETE_TODO = gql`
  #graphql
  mutation DELETE_TODO($id: Int!) {
    deleteTodo(id: $id) {
      message
    }
  }
`;
