import {
  TableCell,
  TableHead,
  TableRow,
  CheckboxField,
  useTheme,
} from '@aws-amplify/ui-react';
import { RxTextAlignLeft } from 'react-icons/rx';
import { GoCalendar } from 'react-icons/go';
import { IconWrapper } from './IconWrapper';

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
        <TableCell>
          {/* TODO: replace this icon */}
          <IconWrapper>
            <RxTextAlignLeft />
          </IconWrapper>{' '}
          <span>Task name</span>
        </TableCell>
        <TableCell>
          {/* TODO: replace this icon */}
          <IconWrapper>
            <GoCalendar />
          </IconWrapper>
          <span>Due date</span>
        </TableCell>
        <TableCell>Weather</TableCell>
        <TableCell>
          {/* TODO: replace this icon */}
          <IconWrapper>
            <RxTextAlignLeft />
          </IconWrapper>
          <span>Note</span>
        </TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};
