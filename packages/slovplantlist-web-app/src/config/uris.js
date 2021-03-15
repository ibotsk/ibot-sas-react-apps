/* eslint-disable max-len */
const backendBase = process.env.REACT_APP_BACKEND;

export default {
  nomenclature: {
    getByIdUri: `${backendBase}/names/<%id%>`,
    getSynonymsOfIdUri: `${backendBase}/names/<%id%>/synonyms?withSubsynonyms=true`,
    getInvalidDesignationsOfIdUri: `${backendBase}/names/<%id%>/invalid-designations`,
    getMisidentificationsOfIdUri: `${backendBase}/names/<%id%>/misidentifications`,
    getForRelationsUri: `${backendBase}/names/<%id%>/for-relations`,
  },
  nomenclatureSearch: {
    scientificUri: `${backendBase}/name-search/scientific`,
  },
  genus: {
    getFamilyApgOfGenusUri: `${backendBase}/genera/<%id%>/family-apg`,
  },
};
