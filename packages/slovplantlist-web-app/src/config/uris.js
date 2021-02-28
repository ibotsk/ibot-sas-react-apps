/* eslint-disable max-len */
const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

export default {
  nomenclature: {
    getByIdUri: `${backendBase}/nomenclatures/<%id%>`,
    getSynonymsOfIdUri: `${backendBase}/nomenclatures/<%id%>/synonyms`,
    getInvalidDesignationsOfIdUri: `${backendBase}/nomenclatures/<%id%>/invalid-designations`,
    getMisidentificationsOfIdUri: `${backendBase}/nomenclatures/<%id%>/misidentifications`,
  },
  nomenclatureSearch: {
    scientificUri: `${backendBase}/nomenclature-search/scientific`,
  },
  genus: {
    getFamilyApgOfGenusUri: `${backendBase}/genera/<%id%>/family-apg`,
  },
};
