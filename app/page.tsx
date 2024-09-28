'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import './../app/app.css';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Input,
  CheckboxField,
} from '@aws-amplify/ui-react';

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState<Array<string>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  function deleteTodo(id: string) {
    try {
      client.models.Todo.delete({ id });
    } catch {
      // TODO: show error
    }
  }

  function updateTodo(todo: Schema['Todo']['type']) {
    setCurrentlyEditing(currentlyEditing.filter((i) => i !== todo.id));
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    const name = window.prompt('Todo name');

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
          {todos.map((todo) =>
            currentlyEditing.includes(todo.id) ? (
              <TableRow key={todo.id}>
                <TableCell>
                  <CheckboxField
                    label="Is done?"
                    name="is_done"
                    labelHidden={true}
                    checked={!!todo.isDone}
                  />
                </TableCell>
                <TableCell>
                  <Input defaultValue={todo.name || ''} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={todo.dueDate || ''} />
                </TableCell>
                <TableCell>
                  <Input defaultValue={todo.note || ''} />
                </TableCell>
                <TableCell>
                  <Button onClick={() => updateTodo(todo)}>E</Button>
                  <Button onClick={() => deleteTodo(todo.id)}>D</Button>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={todo.id}>
                <TableCell>{todo.isDone}</TableCell>
                <TableCell>{todo.name}</TableCell>
                <TableCell>{todo.dueDate}</TableCell>
                <TableCell>{todo.note}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      setCurrentlyEditing([...currentlyEditing, todo.id])
                    }
                  >
                    E
                  </Button>
                  <Button onClick={() => deleteTodo(todo.id)}>D</Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </main>
  );
}
