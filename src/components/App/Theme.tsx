import React from 'react';
import { ThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    green: '#1de9b6',
    red: '#ff4081',
    purple: '#aa00ff',
  },
};

export const Theme = ({ children }: any) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
