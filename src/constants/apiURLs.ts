const apiUrls = {
  singers: {
    root: '/artists',
    details: (id: string) => `/artists/${id}`
  },
  songs: (id: string) => `/artists/${id}/songs`
};

export default apiUrls;
