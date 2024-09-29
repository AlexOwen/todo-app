import {
  TableCell,
  TableHead,
  TableRow,
  CheckboxField,
  useTheme,
} from '@aws-amplify/ui-react';

export const TodoTableHead = ({
  checkAll,
  allChecked,
}: {
  checkAll: () => void;
  allChecked: boolean;
}) => {
  useTheme();
  return (
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
  );
};
