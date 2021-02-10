export default {
  species: {
    name: {
      sl: 's.l.',
      tribus: 'tribus',
      hybrid: '×',
      infra: {
        subsp: 'subsp.',
        var: 'var.',
        subvar: 'subvar.',
        forma: 'forma',
        nothosubsp: 'nothosubsp.',
        nothoforma: 'nothoforma',
        proles: "'prol'",
        unranked: '[unranked]',
      },
      aggregates: {
        wrapL: '[',
        wrapR: ']',
      },
    },
    parts: [ // default basic parts of a species name
      'genus', 'species', 'subsp', 'var', 'subvar', 'forma', 'authors',
      'genusH', 'speciesH', 'subspH', 'subvarH', 'formaH', 'nothosubspH',
      'nothoformaH', 'authorsH',
    ],
  },
  format: {
    italic: 'italic',
    plain: 'plain',
  },
  constants: {
    nonRegularWhitespacesRegex: '[\\u00A0\\u1680\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000]',
    escape: '"',
  }
};
