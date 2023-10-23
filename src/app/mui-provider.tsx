'use client';

import { ThemeProvider } from '@mui/material';
import React, { ReactNode } from 'react';
import { createTheme } from "@mui/material";

type Props = {
   children: ReactNode
}

export const muiTheme = createTheme({
   palette: {
      primary: {
         main: '#B62F2E',

      },
      secondary: {
         main: '#2C2D31',
      },
   },
   shape: {
      borderRadius: 8
   },
   typography: {
      allVariants: {
         textTransform: "none"
      }
   }
});


export default function MuiProvider({ children }: Props) {
   return (
      <ThemeProvider theme={muiTheme}>
         {children}
      </ThemeProvider>
   )
}
