import React from 'react';

import PropTypes from 'prop-types';

import config from '../../../config';
import FilterScientific from '../Filter/FilterScientific';
import FilterVernacular from '../Filter/FilterVernacular';

const { routes } = config;

/**
 * Bootstrap filter to a page based on the path
 * @param {*} param0
 */
const FilterRouter = ({ pathname, closed, onSearch }) => {
  switch (pathname) {
    case routes.slovakNames.route:
      return <FilterVernacular closed={closed} onSearch={onSearch} />;
    case routes.home.route:
    case routes.scientificNames.route:
    case routes.nameDetail.route:
    default:
      return <FilterScientific closed={closed} onSearch={onSearch} />;
  }
};

export default FilterRouter;

FilterRouter.propTypes = {
  pathname: PropTypes.string.isRequired,
  closed: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};
