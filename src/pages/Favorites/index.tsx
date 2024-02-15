import React, { useState } from 'react';

import InfoFavoriteModal from 'components/InfoFavoriteModal';
import SongsTable from 'components/SongsTable';
import { useAppSelector } from 'hooks/redux';
import { ISong } from 'interfaces/interfaces';
import { Box, Typography } from '@mui/material';

import styles from './Favorites.module.scss';

const Favorites: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [favoriteSong, setFavoriteSong] = useState<ISong>();
  const { songs: favoriteSongs } = useAppSelector(state => state.favoritesReducer);

  const openInfoFavoriteModal = (song: ISong) => {
    setOpen(prev => !prev);
    setFavoriteSong(song);
  };

  const closeInfoFavoriteModal = () => {
    setOpen(prev => !prev);
  };

  return (
    <Box className={styles.container}>
      {favoriteSongs.length ? (
        <SongsTable isFavoritePage toggleInfoFavoriteModal={openInfoFavoriteModal} />
      ) : (
        <Typography component="h2" className={styles.infoMessage}>
          The list of your favorite songs is currently empty. Please go to the list of songs and add
          them to your favorites 🌟😄🌟
        </Typography>
      )}
      <InfoFavoriteModal
        open={open}
        favoriteSong={favoriteSong}
        handleClose={closeInfoFavoriteModal}
      />
    </Box>
  );
};

export default Favorites;
