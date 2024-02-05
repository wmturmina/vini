import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

import Providers from './context';
import './style.css';
import App from './App';
import { theme as importedTheme } from './assets/theme';

const theme = createTheme(importedTheme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Providers>
          <App />
        </Providers>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);
