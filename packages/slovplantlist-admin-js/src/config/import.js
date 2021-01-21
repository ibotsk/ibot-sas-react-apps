export default {
  columns: {
    0: {
      name: 'ntype',
    },
    1: {
      name: 'syntype',
    },
    2: {
      name: 'genus',
      compare: true,
    },
    3: {
      name: 'species',
      compare: true,
    },
    4: {
      name: 'subsp',
      compare: true,
    },
    5: {
      name: 'var',
      compare: true,
    },
    6: {
      name: 'subvar',
      compare: true,
    },
    7: {
      name: 'forma',
      compare: true,
    },
    8: {
      name: 'authors',
      compare: true,
    },
    9: {
      name: 'vernacular',
    },
    10: {
      name: 'genusH',
      compare: true,
    },
    11: {
      name: 'speciesH',
      compare: true,
    },
    12: {
      name: 'subspH',
      compare: true,
    },
    13: {
      name: 'varH',
      compare: true,
    },
    14: {
      name: 'subvarH',
      compare: true,
    },
    15: {
      name: 'formaH',
      compare: true,
    },
    16: {
      name: 'nothosubspH',
      compare: true,
    },
    17: {
      name: 'nothoformaH',
      compare: true,
    },
    18: {
      name: 'authorsH',
      compare: true,
    },
    19: {
      name: 'aggregate',
    },
  },
  constants: {
    operation: {
      create: {
        key: 'create',
        text: 'create',
        colour: 'success',
      },
      update: {
        key: 'update',
        text: 'update',
        colour: 'warning',
      },
      duplicate: {
        key: 'duplicate',
        text: 'duplicate',
        colour: 'info',
      }
    },
    messages: {
      duplicates: 'info',
      errors: 'danger',
    },
  },
};
