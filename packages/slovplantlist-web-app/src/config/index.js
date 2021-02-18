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
    nameDetail: {
      route: '/names/detail/:id',
      drawerOpened: true,
    },
  },
  status: {
    A: {
      key: 'A',
      text: 'Accepted name',
      colour: '#57ab27',
    },
    PA: {
      key: 'PA',
      text: 'Provisionally accepted',
      colour: '#ee7f00',
    },
    S: {
      key: 'S',
      text: 'Synonym',
      colour: '#008fc8',
    },
    DS: {
      key: 'DS',
      text: 'Doubtful synonym',
      colour: '#0089a0',
    },
    U: {
      key: 'U',
      text: 'Unresolved',
      colour: '#bb9d00',
    },
    PC: {
      key: 'PC',
      text: 'Parent combination notation',
      colour: '#999',
    },
    TP: {
      key: 'TP',
      text: 'Taxon position notation',
      colour: '#999',
    },
  },
  pagination: {
    rowsPerPageOptions: [10, 20, 40],
  },
};
