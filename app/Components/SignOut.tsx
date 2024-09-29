'use client';

import { Button } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import styled from 'styled-components';

const StyledSignOutButton = styled(Button)`
  background: #000;
  color: #fff;

  &:hover {
    border-color: #017055;
  }
`;

export const SignOut = () => {
  return (
    <StyledSignOutButton onClick={() => signOut()}>
      Sign Out
    </StyledSignOutButton>
  );
};
