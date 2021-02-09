import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

import LosName from './LosName';

const LosNameList = ({ list }) => {
  if (list && list.length) {
    return (
      <ListGroup>
        {
          list.map((b) => (
            <ListGroupItem key={b.id}>
              <LosName data={b} />
            </ListGroupItem>
          ))
        }
      </ListGroup>
    );
  }
  return '-';
};

export default LosNameList;

LosNameList.propTypes = {
  list: PropTypes.arrayOf(SpeciesType.type),
};

LosNameList.defaultProps = {
  list: undefined,
};
