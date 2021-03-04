/* eslint-disable max-len */
const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

export default {
  nomenclature: {
    getByIdUri: `${backendBase}/nomenclatures/<%id%>`,
    getSynonymsOfIdUri: `${backendBase}/nomenclatures/<%id%>/synonyms?withSubsynonyms=true`,
    getInvalidDesignationsOfIdUri: `${backendBase}/nomenclatures/<%id%>/invalid-designations`,
    getMisidentificationsOfIdUri: `${backendBase}/nomenclatures/<%id%>/misidentifications`,
    getForRelationsUri: `${backendBase}/nomenclatures/<%id%>/for-relations`,
  },
  nomenclatureSearch: {
    scientificUri: `${backendBase}/nomenclature-search/scientific`,
  },
  genus: {
    getFamilyApgOfGenusUri: `${backendBase}/genera/<%id%>/family-apg`,
  },
};
