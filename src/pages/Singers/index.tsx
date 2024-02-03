import React from 'react';

import { useFetchAllSingersQuery } from 'services/SingersService';
import Loader from 'components/Loader';
import SingerCard from 'components/SingerCard';
import { ISinger } from 'interfaces/interfaces';
import { Box, Typography } from '@mui/material';

import styles from './Singers.module.scss';

const Singers: React.FC = () => {
  const { data: singers, isLoading, isError } = useFetchAllSingersQuery('');

  if (isLoading) {
    return (
      <Box className={styles.loaderContainer}>
        <Loader size={80} />
      </Box>
    );
  }

  const renderError = () => (
    <Typography component="h2" className={styles.errorMessage}>
      Failed to fetch singers data. 😢 Please try again.
    </Typography>
  );

  return (
    <Box className={styles.container}>
      {isError
        ? renderError()
        : singers.map((singer: ISinger) => <SingerCard key={singer.id} singer={singer} />)}
    </Box>
  );
};

export default Singers;
