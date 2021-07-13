import React from 'react';

import {
  Chip, Tooltip,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import GenusType from 'components/propTypes/genus';

const tooltipInfo = (genus) => (
  <>
    <p>
      <strong>
        {genus.name}
        {' '}
        {genus.authors}
      </strong>
    </p>
    <p>
      Family:
      <strong>{genus.family ? genus.family.name : '-'}</strong>
    </p>
    <p>
      Family APG:
      <strong>{genus.familyApg ? genus.familyApg.name : '-'}</strong>
    </p>
  </>
);

const GeneraList = ({ data }) => (
  <>
    {
      data.map((g) => (
        <Tooltip key={g.id} title={tooltipInfo(g)}>
          <Chip
            key={g.id}
            label={g.name}
            variant="outlined"
          />
        </Tooltip>
      ))
    }
  </>
);

export default GeneraList;

GeneraList.propTypes = {
  data: PropTypes.arrayOf(GenusType.type).isRequired,
};
