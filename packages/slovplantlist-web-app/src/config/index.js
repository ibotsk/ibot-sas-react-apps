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
      text: 'Accepted',
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
  synonymType: {
    0: 'other',
    1: 'invalid',
    2: 'taxonomic',
    3: 'nomenclatoric',
    4: 'misidentification',
  },
  synonymPrefix: {
    nomenclatoric: {
      value: '≡',
    },
    invalid: {
      value: '–',
    },
    taxonomic: {
      value: '=',
    },
    misidentification: {
      value: '–',
    },
    other: {
      value: '',
    },
  },
  pagination: {
    rowsPerPageOptions: [10, 20, 40],
  },
};
