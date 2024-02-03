const routes = {
  home: '/',
  singers: {
    list: '/singers',
    details: {
      path: '/singers/:id',
      link: (id: string) => `/singers/${id}`
    }
  },
  favorites: '/favorites'
};

export default routes;
