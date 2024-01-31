import React from 'react';

import { Box } from '@mui/material';

import styles from './WeatherForecast.module.scss';

const WeatherForecast: React.FC = () => {
  return (
    <Box className={styles.container} data-testid="weather-forecast">
      <Box className={styles.mainContent}>Hello!!!</Box>
    </Box>
  );
};

export default WeatherForecast;
