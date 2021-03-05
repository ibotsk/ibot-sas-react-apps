/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { generatePath, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import { LosName } from '@ibot/components';

import LabelValueGrid from 'components/segments/Common/LabelValueGrid';

import config from 'config';

const {
  routes: routesConfig,
} = config;

const getNameDetailPath = (id) => generatePath(
  routesConfig.nameDetail.route, { id },
);

const NameLabelValue = ({ label, data = undefined }) => (
  <LabelValueGrid label={label}>
    {data ? (
      <LosName
        data={data}
        format="italic"
        component={RouterLink}
        to={getNameDetailPath(data.id)}
      />
    ) : (
      <>
        -
      </>
    )}
  </LabelValueGrid>
);

export default NameLabelValue;

NameLabelValue.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.object,
};

NameLabelValue.defaultProps = {
  data: undefined,
};
