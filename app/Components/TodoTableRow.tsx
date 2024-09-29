import { Schema } from '@/amplify/data/resource';
import {
  TableCell,
  TableRow,
  CheckboxField,
  TextField,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import styled from 'styled-components';

const StyledActionButton = styled(Button)`
  padding: 0;
`;

type Props = {
  todo: Schema['Todo']['type'];
  updateTodo: (todo: Schema['Todo']['type']) => void;
  deleteTodo: (id: string) => void;
};

export const TodoTableRow = ({ todo, updateTodo, deleteTodo }: Props) => {
  useTheme();

  const [currentlyEditing, setCurrentlyEditing] = useState<Array<string>>([]);

  function checkOne(todo: Schema['Todo']['type'], newValue: boolean) {
    updateTodo({ ...todo, isDone: newValue });
  }

  function finishEdit(todo: Schema['Todo']['type']) {
    setCurrentlyEditing(currentlyEditing.filter((t) => t !== todo.id));
    updateTodo(todo);
  }

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
        <StyledActionButton variation="link" onClick={() => finishEdit(todo)}>
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
          onChange={(event) => checkOne(todo, event.target.checked)}
        />
      </TableCell>
      <TableCell>{todo.name}</TableCell>
      <TableCell>{todo.dueDate}</TableCell>
      <TableCell>{todo.note}</TableCell>
      <TableCell>
        <StyledActionButton
          variation="link"
          onClick={() => setCurrentlyEditing([...currentlyEditing, todo.id])}
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
};
