import React, { FC } from 'react';

import { ISong } from 'interfaces/interfaces';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type InfoFavoriteModalProps = {
  open: boolean;
  favoriteSong?: ISong;
  handleClose: () => void;
};

const InfoFavoriteModal: FC<InfoFavoriteModalProps> = ({ open, favoriteSong, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 'bold' }}>
        Info about favorite song
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          component="img"
          sx={{
            width: 200,
            height: 200,
            borderRadius: '10px'
          }}
          src={favoriteSong?.cover}
          alt="cover"
        />
        <Typography mt="20px" mb="20px">
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Singer name:{' '}
          </Box>
          {favoriteSong?.artistName}
        </Typography>
        <Typography mb="20px">
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Song name:{' '}
          </Box>
          {favoriteSong?.name}
        </Typography>
        <Typography mb="20px">
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            Duration:{' '}
          </Box>
          {favoriteSong?.duration}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ color: 'white' }}
          color="info"
          onClick={handleClose}
          autoFocus
        >
          Awessom
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoFavoriteModal;
