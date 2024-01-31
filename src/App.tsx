import React from 'react';

import WeatherForecast from 'pages/WeatherForecast';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from 'theme/teme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <WeatherForecast />
      </ThemeProvider>
    </>
  );
}

export default App;
