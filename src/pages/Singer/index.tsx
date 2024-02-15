import React from 'react';
import { useParams } from 'react-router-dom';

import { useFetchSingerQuery, useFetchSongsQuery } from 'services/SingerService';
import Loader from 'components/Loader';
import SongsTable from 'components/SongsTable';
import { Box, Typography } from '@mui/material';

import styles from './Singer.module.scss';

const Singer: React.FC = () => {
  const { id } = useParams();
  const {
    data: singer,
    isLoading: isLoadingSinger,
    isError: isErrorSinger
  } = useFetchSingerQuery(id);
  const { data: songs, isLoading: isLoadingSongs, isError: isErrorSongs } = useFetchSongsQuery(id);

  if (isLoadingSinger || isLoadingSongs) {
    return (
      <Box className={styles.loaderContainer}>
        <Loader size={80} />
      </Box>
    );
  }

  const renderError = (prop: string) => (
    <Typography component="h2" className={styles.errorMessage}>
      {`Failed to fetch ${prop} data. 😢 Try please again.`}
    </Typography>
  );

  return (
    <Box className={styles.container}>
      {isErrorSinger ? (
        renderError('singer')
      ) : (
        <>
          <Box component="img" className={styles.avatar} src={singer.avatar} alt="avatar" />
          <Typography component="h2" className={styles.singerName}>
            {singer.name}
          </Typography>
        </>
      )}
      {isErrorSongs ? renderError('songs') : <SongsTable songs={songs} />}
    </Box>
  );
};

export default Singer;
