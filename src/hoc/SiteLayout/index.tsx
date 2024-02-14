import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';
import { usePageTitle } from 'hooks/usePageTitle';
import routes from 'constants/routes';
import { ArrowBack, Favorite, HeartBroken } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';

import styles from './SiteLayout.module.scss';

import logo from 'assets/images/cat.jpg';

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  usePageTitle(pathname);
  const { songs } = useAppSelector(state => state.favoritesReducer);
  const navigate = useNavigate();

  const navigateTo = () => {
    if (pathname !== routes.favorites) {
      navigate(routes.favorites);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const getTitle = (path: string): string => {
    switch (path) {
      case routes.singers.list:
        return 'Singers';
      case routes.favorites:
        return 'Favorites';
      default:
        if (path.startsWith('/singers/')) {
          return 'Singer';
        } else {
          return 'Unknown';
        }
    }
  };

  const renderLogoOrBackButton = () => {
    if (pathname === routes.singers.list) {
      return <Box className={styles.img} component="img" src={logo} alt="logo" />;
    } else {
      return (
        <Button
          variant="contained"
          color="info"
          sx={{ color: theme => theme.palette.common.white }}
          startIcon={<ArrowBack />}
          onClick={goBack}
        >
          Back
        </Button>
      );
    }
  };

  const renderFavoriteIcon = () => {
    const IconComponent = songs.length ? Favorite : HeartBroken;

    return (
      <IconButton color="secondary" size="medium" onClick={navigateTo} disableRipple>
        <Box className={styles.favoriteIconBlock}>
          <IconComponent className={styles.iconBtn} fontSize="large" />
          <Box className={styles.favoriteCount}>{songs.length}</Box>
        </Box>
      </IconButton>
    );
  };

  return (
    <>
      <Box component="header" className={styles.header}>
        <Box className={styles.leftBlock}>{renderLogoOrBackButton()}</Box>
        <Typography component="h2" className={styles.headerTitle}>
          {getTitle(pathname)}
        </Typography>
        {renderFavoriteIcon()}
      </Box>
      <Box component="main" className={styles.main}>
        <Box className={styles.container}>{children}</Box>
      </Box>
    </>
  );
};

export { SiteLayout };
