import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function Theme({ children }: { children: ReactNode }): JSX.Element {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
