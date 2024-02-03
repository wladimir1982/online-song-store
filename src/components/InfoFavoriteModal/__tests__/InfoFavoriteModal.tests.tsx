import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import InfoFavoriteModal from '../index';

describe('InfoFavoriteModal', () => {
  const handleClose = jest.fn();

  beforeEach(() => {
    render(
      <InfoFavoriteModal
        open={true}
        favoriteSong={{
          artistId: '123',
          artistName: 'John Doe',
          cover: 'song-cover.jpg',
          duration: '3:30',
          id: '456',
          name: 'Awesome Song'
        }}
        handleClose={handleClose}
      />
    );
  });

  test('renders modal with correct title', () => {
    const titleElement = screen.getByText('Info about favorite song');
    expect(titleElement).toBeInTheDocument();
  });

  test('renders song information correctly', () => {
    const singerNameElement = screen.getByText('Singer name:');
    const songNameElement = screen.getByText('Song name:');
    const durationElement = screen.getByText('Duration:');

    expect(singerNameElement).toBeInTheDocument();
    expect(songNameElement).toBeInTheDocument();
    expect(durationElement).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Awesome Song')).toBeInTheDocument();
    expect(screen.getByText('3:30')).toBeInTheDocument();
  });

  test('calls handleClose when "Awessom" button is clicked', () => {
    const closeButton = screen.getByText('Awessom');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});
