'use client';

import { theme } from './theme';
import { ThemeProvider } from '@aws-amplify/ui-react';

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
