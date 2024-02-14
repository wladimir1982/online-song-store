import React, { FC, useState } from 'react';
import { addSongToFavorite, removeSongFromFavorite } from 'store/reducers/Favorites';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ISong } from 'interfaces/interfaces';
import { useSnackbar } from 'notistack';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { CustomTablePagination, Root } from './styles';

type SingerCardProps = {
  songs?: ISong[];
  isFavoritePage?: boolean;
  toggleInfoFavoriteModal?: (song: ISong) => void;
};
const SongsTable: FC<SingerCardProps> = ({
  songs = [],
  isFavoritePage = false,
  toggleInfoFavoriteModal
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { songs: favoriteSongs } = useAppSelector(state => state.favoritesReducer);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const listOfSongs: ISong[] = isFavoritePage ? favoriteSongs : songs;

  const createData = (song: ISong) => {
    return { ...song };
  };

  const rows = listOfSongs
    .map((song: ISong) => createData({ ...song }))
    .sort((a: ISong, b: ISong) => (a.name < b.name ? -1 : 1));

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleFavoriteSong = (song: ISong, isFavorite: boolean) => {
    if (isFavorite) {
      dispatch(removeSongFromFavorite(song.id));
      enqueueSnackbar('The song has been successfully removed from favorites 😢');
    } else {
      dispatch(addSongToFavorite(song));
      enqueueSnackbar('The song has been successfully added to favorites 🌟😄🌟');
    }
  };

  const handleToggleInfoFavoriteModal = (song: ISong) => {
    if (toggleInfoFavoriteModal) {
      toggleInfoFavoriteModal(song);
    }
  };

  const renderFavoriteIcon = (song: ISong) => {
    const isFavorite = favoriteSongs.some(favoriteSong => favoriteSong.id === song.id);
    const IconComponent = isFavorite ? Favorite : FavoriteBorder;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          sx={{ color: '#DC143C' }}
          size="small"
          onClick={() => toggleFavoriteSong(song, isFavorite)}
        >
          <IconComponent sx={{ width: 25, height: 25 }} />
        </IconButton>
      </Box>
    );
  };

  return (
    <Root>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Favorites</th>
            <th>Cover</th>
            <th>Song name</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: ISong) => (
            <tr key={row.id}>
              <td style={{ width: 60 }}>{renderFavoriteIcon(row)}</td>
              <td style={{ width: 60 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box
                    component="img"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      cursor: isFavoritePage ? 'pointer' : 'inherit'
                    }}
                    src={row.cover}
                    alt="cover"
                    onClick={() => handleToggleInfoFavoriteModal(row)}
                  />
                </Box>
              </td>
              <td style={{ width: 400 }} align="right">
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    cursor: isFavoritePage ? 'pointer' : 'inherit',
                    textDecoration: isFavoritePage ? 'underline' : 'none',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-all'
                  }}
                  onClick={() => handleToggleInfoFavoriteModal(row)}
                >
                  {row.name}
                </Typography>
              </td>
              <td style={{ width: 60 }} align="center">
                {row.duration}
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5]}
              colSpan={4}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  'aria-label': 'rows per page'
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true
                }
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
};

export default SongsTable;
