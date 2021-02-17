export default {
  routes: {
    home: {
      route: '/',
      drawerOpened: false,
    },
    scientificNames: {
      route: '/names/scientific',
      drawerOpened: true,
    },
    slovakNames: {
      route: '/names/slovak',
      drawerOpened: true,
    },
  },
  pagination: {
    rowsPerPageOptions: [10, 20, 40],
  },
};
