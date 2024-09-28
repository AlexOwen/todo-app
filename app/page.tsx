"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
} from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function deleteTodo() {

  }

  function updateTodo() {

  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    const name = window.prompt("Todo content");

    if (name) {
      client.models.Todo.create({
        name,
      });
    } else {
      // TODO: show error
    }
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <Table>
        <TableHead></TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.isDone}</TableCell>
              <TableCell>{todo.name}</TableCell>
              <TableCell>{todo.dueDate}</TableCell>
              <TableCell>{todo.note}</TableCell>
              <TableCell><Button onClick={updateTodo}>E</Button><Button onClick={deleteTodo}>D</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
