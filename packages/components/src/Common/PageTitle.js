import React from 'react';
import { Helmet } from 'react-helmet';

import PropTypes from 'prop-types';

const PageTitle = ({ websiteTitle, title }) => (
  <Helmet>
    <title>{[websiteTitle, title].filter((e) => !!e).join(' - ')}</title>
  </Helmet>
);

export default PageTitle;

PageTitle.propTypes = {
  websiteTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

PageTitle.defaultProps = {
  websiteTitle: undefined,
};
