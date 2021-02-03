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
      compareInDB: true,
    },
    3: {
      name: 'species',
      compareInDB: true,
    },
    4: {
      name: 'subsp',
      compareInDB: true,
    },
    5: {
      name: 'var',
      compareInDB: true,
    },
    6: {
      name: 'subvar',
      compareInDB: true,
    },
    7: {
      name: 'forma',
      compareInDB: true,
    },
    8: {
      name: 'authors',
      compareInDB: true,
    },
    9: {
      name: 'vernacular',
    },
    10: {
      name: 'genusH',
      compareInDB: true,
    },
    11: {
      name: 'speciesH',
      compareInDB: true,
    },
    12: {
      name: 'subspH',
      compareInDB: true,
    },
    13: {
      name: 'varH',
      compareInDB: true,
    },
    14: {
      name: 'subvarH',
      compareInDB: true,
    },
    15: {
      name: 'formaH',
      compareInDB: true,
    },
    16: {
      name: 'nothosubspH',
      compareInDB: true,
    },
    17: {
      name: 'nothoformaH',
      compareInDB: true,
    },
    18: {
      name: 'authorsH',
      compareInDB: true,
    },
    19: {
      name: 'aggregate',
    },
    20: {
      name: 'notes',
    },
    21: {
      name: 'subaggregate',
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
      },
    },
    messages: {
      duplicates: 'info',
      errors: 'danger',
    },
  },
};
