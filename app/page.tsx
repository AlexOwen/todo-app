'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import './../app/app.css';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { Button, ThemeProvider, useTheme } from '@aws-amplify/ui-react';
import styled from 'styled-components';
import { TodoTable } from './Components/TodoTable';
import { theme } from './theme';

const StyledH1 = styled.h1`
  margin-bottom: 80px;
`;

const StyledAddButton = styled(Button)`
  margin-bottom: 40px;
  width: 160px;
  padding: 12px;
`;

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  useTheme();

  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);

  // Fetch all Todos on load
  useEffect(() => {
    listTodos();
  }, []);

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
    client.models.Todo.update(todo);
  }

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
    <ThemeProvider theme={theme}>
      <main>
        <StyledH1>My Tasks for the next month</StyledH1>
        <StyledAddButton onClick={createTodo}>+ Add task</StyledAddButton>
        <h2>Tasks to do</h2>
        <TodoTable
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </main>
    </ThemeProvider>
  );
}
