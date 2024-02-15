export interface ISinger {
  avatar: string;
  id: string;
  name: string;
  songsCount: number;
}

export interface ISong {
  artistId: string;
  artistName: string;
  cover: string;
  duration: string;
  id: string;
  name: string;
}
