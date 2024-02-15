import React from 'react';
import { useNavigate } from 'react-router-dom';

import routes from 'constants/routes';
import { ISinger } from 'interfaces/interfaces';
import { Box, Typography } from '@mui/material';

import styles from './SingerCard.module.scss';

type SingerCardProps = {
  singer: ISinger;
};
const SingerCard: React.FC<SingerCardProps> = ({ singer }) => {
  const navigate = useNavigate();
  const navigateTo = (id: string) => {
    navigate(routes.singers.details.link(id));
  };

  return (
    <Box className={styles.cardContainer} onClick={() => navigateTo(singer.id)}>
      <Box component="img" className={styles.avatar} src={singer.avatar} alt="avatar" />
      <Typography component="h2" className={styles.singerName}>
        {singer.name}
      </Typography>
      <Typography className={styles.songsCount}>Count of songs: {singer.songsCount}</Typography>
    </Box>
  );
};

export default SingerCard;
