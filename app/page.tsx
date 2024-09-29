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
  TextField,
  CheckboxField,
  useTheme,
} from '@aws-amplify/ui-react';
import styled from 'styled-components';

const StyledTableContainer = styled.div`
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9e9e7;
  border-radius: 4px;
  padding: 8px;
`;

const StyledTable = styled(Table)`
  thead tr td {
    border-bottom-width: 1px;
  }

  tbody tr td {
    border-bottom-width: 1px;
  }

  tbody tr:last-of-type td {
    border-bottom-width: 0;
  }

  td {
    padding: 8px;
  }
`;

const StyledH1 = styled.h1`
  margin-bottom: 80px;
`;

const StyledAddButton = styled(Button)`
  margin-bottom: 40px;
  width: 160px;
  padding: 12px;
`;

const StyledActionButton = styled(Button)`
  padding: 0;
`;

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  useTheme();

  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const [currentlyEditing, setCurrentlyEditing] = useState<Array<string>>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);

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
    setCurrentlyEditing(currentlyEditing.filter((t) => t !== todo.id));
    client.models.Todo.update(todo);
  }

  function checkAll() {
    if (todos.length) {
      todos.forEach((t) =>
        client.models.Todo.update({ ...t, isDone: !allChecked })
      );
    }
  }

  useEffect(() => {
    if (todos.length) {
      setAllChecked(todos.every((t) => t.isDone === true));
    }
  }, [todos]);

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
      <StyledH1>My Tasks for the next month</StyledH1>
      <StyledAddButton onClick={createTodo}>+ Add task</StyledAddButton>
      <h2>Tasks to do</h2>
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <CheckboxField
                  label="All done?"
                  name="all_done"
                  labelHidden={true}
                  checked={allChecked}
                  onChange={checkAll}
                />
              </TableCell>
              <TableCell>Task name</TableCell>
              <TableCell>Due date</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => {
              return currentlyEditing.includes(todo.id) ? (
                <TableRow key={todo.id}>
                  <TableCell>
                    <CheckboxField
                      label="Done?"
                      name="done"
                      labelHidden={true}
                      checked={!!todo.isDone}
                      disabled={true}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Name"
                      labelHidden={true}
                      defaultValue={todo.name || ''}
                      onChange={(event) => (todo.name = event.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Due date"
                      labelHidden={true}
                      defaultValue={todo.dueDate || ''}
                      type="date"
                      onChange={(event) => (todo.dueDate = event.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Note"
                      labelHidden={true}
                      defaultValue={todo.note || ''}
                      onChange={(event) => (todo.note = event.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <StyledActionButton
                      variation="link"
                      onClick={() => updateTodo(todo)}
                    >
                      E
                    </StyledActionButton>
                    <StyledActionButton
                      variation="link"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      D
                    </StyledActionButton>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={todo.id}>
                  <TableCell>
                    <CheckboxField
                      label="Done?"
                      name="done"
                      labelHidden={true}
                      checked={!!todo.isDone}
                      onChange={(event) =>
                        client.models.Todo.update({
                          ...todo,
                          isDone: event.target.checked,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{todo.name}</TableCell>
                  <TableCell>{todo.dueDate}</TableCell>
                  <TableCell>{todo.note}</TableCell>
                  <TableCell>
                    <StyledActionButton
                      variation="link"
                      onClick={() =>
                        setCurrentlyEditing([...currentlyEditing, todo.id])
                      }
                    >
                      E
                    </StyledActionButton>
                    <StyledActionButton
                      variation="link"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      D
                    </StyledActionButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </main>
  );
}
