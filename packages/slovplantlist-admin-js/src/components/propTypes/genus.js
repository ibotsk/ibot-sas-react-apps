import PropTypes from 'prop-types';

export default {
  type: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    authors: PropTypes.string,
    vernacular: PropTypes.string,
    idAcceptedName: PropTypes.number,
  }),
};
