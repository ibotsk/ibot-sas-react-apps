/* eslint-disable max-len */
import uris from './uris';

export default {

  constants: {
    columns: {
      speciesName: 'speciesName',
      ownership: 'ownerIds',
      checkedTimestampColumn: 'checkedTimestamp',
    },
    ownershipRegexp: {
      start: '(\\,|^)',
      end: '(\\,|$)',
    },
    checkedTimestampOptions: {
      checked: 'CHECKED',
      notChecked: 'NOT CHECKED',
    },
    userRealm: 'slovplantlist',
    userPrincipalType: 'user',
    insertedMethod: {
      default: 'DEFAULT',
      form: 'FORM',
      import: 'IMPORT',
    },
    updatedMethod: {
      form: 'FORM',
      import: 'IMPORT',
    },
    labelColumnWidth: 3,
    contentColumnWidth: 9,
    operators: {
      contains: 'contains',
      startsWith: 'startsWith',
      endsWith: 'endsWith',
      equals: 'equals',
      notEquals: 'notEquals',
      regexp: 'regexp',
      is: 'is',
      not: 'not',
      after: 'after',
      onOrAfter: 'onOrAfter',
      before: 'before',
      onOrBefore: 'onOrBefore',
    },
  },
  nomenclature: {
    filter: {
      ntypesGroup: ['A', 'PA', 'S', 'DS'],
      listOfSpecies: [
        'genus',
        'species',
        'subsp',
        'var',
        'subvar',
        'forma',
        'nothosubsp',
        'nothoforma',
        'authors',
        'genusH',
        'speciesH',
        'subspH',
        'varH',
        'subvarH',
        'formaH',
        'nothosubspH',
        'nothoformaH',
        'authorsH',
      ],
    },
  },
  mappings: {
    losType: {
      A: {
        key: 'A',
        text: 'Accepted name',
        color: 'success.main',
      },
      PA: {
        key: 'PA',
        text: 'Provisionally accepted',
        color: 'success.light',
      },
      S: {
        key: 'S',
        text: 'Synonym',
        color: 'info.main',
      },
      DS: {
        key: 'DS',
        text: 'Doubtful synonym',
        color: 'info.dark',
      },
      U: {
        key: 'U',
        text: 'Unresolved',
        color: 'warning.main',
      },
      PC: {
        key: 'PC',
        text: 'Parent combination',
        color: 'text.disabled',
      },
      TP: {
        key: 'TP',
        text: 'Taxon position',
        color: 'text.disabled',
      },
    },
    genusType: {
      A: {
        label: 'Accepted name',
        value: 'A',
      },
      S: {
        label: 'Synonym',
        value: 'S',
      },
    },
    synonym: {
      nomenclatoric: {
        numType: 3,
        prefix: '≡',
      },
      taxonomic: {
        numType: 2,
        prefix: '=',
      },
      invalid: {
        numType: 1,
        prefix: '–',
      },
      misidentification: {
        numType: 4,
        prefix: '–',
      },
      none: {
        numType: 0,
        prefix: '',
      },
    },
    synonymBySyntype: {
      0: 'none',
      1: 'invalid',
      2: 'taxonomic',
      3: 'nomenclatoric',
      4: 'misidentification',
    },
    userRole: {
      admin: {
        name: 'admin',
        text: 'ADMIN',
        colour: '#C9302C',
      },
      editor: {
        name: 'editor',
        text: 'EDITOR',
        colour: '#bb9d00',
      },
      author: {
        name: 'author',
        text: 'AUTHOR',
        colour: '#57ab27',
      },
    },
    ownership: {
      all: {
        key: 'all',
        text: 'ALL',
      },
      mine: {
        key: 'mine',
        text: 'MINE',
      },
      others: {
        key: 'others',
        text: 'OTHERS',
      },
      unassigned: {
        key: 'unassigned',
        text: 'UNASSIGNED',
      },
      notmine: {
        key: 'notmine',
        text: 'NOT MINE',
      },
    },
  },
  pagination: {
    paginationSize: 7,
    pageStartIndex: 1,
    alwaysShowAllBtns: true, // Always show next and previous button
    withFirstAndLast: true, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    // firstPageText: 'First',
    // prePageText: 'Back',
    // nextPageText: 'Next',
    // lastPageText: 'Last',
    // nextPageTitle: 'First page',
    // prePageTitle: 'Pre page',
    // firstPageTitle: 'Next page',
    // lastPageTitle: 'Last page',
    showTotal: true,
    // paginationTotalRenderer: customTotal, //custom renderer is in TablePageParent
    sizePerPageList: [
      {
        text: '25',
        value: 25,
      }, {
        text: '50',
        value: 50,
      }, {
        text: '100',
        value: 100,
      }], // A numeric array is also available. the purpose of above example is custom the text
  },
  uris,

  logging: {
    level: 'debug',
  },

};
