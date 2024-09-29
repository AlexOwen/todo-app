import { Table, TableBody, useTheme } from '@aws-amplify/ui-react';
import styled from 'styled-components';
import type { Schema } from '@/amplify/data/resource';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { TodoTableHead } from './TodoTableHead';
import { TodoTableRow } from './TodoTableRow';
import { theme } from '../theme';

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

type Props = {
  todos: Array<Schema['Todo']['type']>;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Schema['Todo']['type']) => void;
};

export const TodoTable = ({ todos, updateTodo, deleteTodo }: Props) => {
  useTheme();

  const [allChecked, setAllChecked] = useState<boolean>(false);

  useEffect(() => {
    if (todos.length) {
      setAllChecked(todos.every((t) => t.isDone === true));
    }
  }, [todos]);

  function checkAll() {
    if (todos.length) {
      todos.forEach((t) => updateTodo({ ...t, isDone: !allChecked }));
    }
  }

  return (
    <StyledTableContainer>
      <StyledTable>
        <TodoTableHead checkAll={checkAll} allChecked={allChecked} />
        <TableBody>
          {todos.map((todo) => (
            <TodoTableRow
              key={todo.id}
              todo={todo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};
