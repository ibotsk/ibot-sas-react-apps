const rules = {
  author: {
    dynamic: {
      'species:edit': ({ speciesGenusId, userGeneraIds }) => { // can edit only species of the genus assigned to user
        if (!speciesGenusId || !userGeneraIds) {
          return false;
        }
        return userGeneraIds.includes(speciesGenusId);
      },
    },
  },
  editor: {
    static: [
      'checklist:edit',
      'checklist:add',
      'checklist:delete',
      'species:edit',
      'species:delete',
      'genus:edit',
      'genus:delete',
      'family:edit',
      'family:delete',
      'familyAPG:edit',
      'familyAPG:delete',
    ],
  },
  admin: {
    static: [
      'checklist:edit',
      'checklist:add',
      'checklist:delete',
      'species:edit',
      'species:delete',
      'genus:edit',
      'genus:delete',
      'family:edit',
      'family:delete',
      'familyAPG:edit',
      'familyAPG:delete',
      'users',
    ],
  },
};

export default rules;
