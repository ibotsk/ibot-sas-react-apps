import React from 'react';
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';

const PageTitle = ({ title }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
