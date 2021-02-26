/* eslint-disable max-len */
const backendBase = `${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}`;

export default {
  nomenclature: {
    getByIdUri: `${backendBase}/nomenclatures/<%id%>`,
  },
  nomenclatureSearch: {
    scientificUri: `${backendBase}/nomenclature-search/scientific`,
  },
};
