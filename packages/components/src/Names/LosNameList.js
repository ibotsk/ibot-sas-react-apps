import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

import LosName from './LosName';

const LosNameList = ({ list, losNameOptions = {} }) => {
  const {
    format, isPublication, isTribus, isAggregate,
    uri = () => undefined,
  } = losNameOptions;

  if (list && list.length) {
    return (
      <ListGroup>
        {
          list.map((d) => (
            <ListGroupItem key={d.id}>
              <LosName
                data={d}
                format={format}
                isPublication={isPublication}
                isTribus={isTribus}
                isAggregates={isAggregate}
                uri={uri(d.id)}
              />
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
  losNameOptions: PropTypes.shape({
    format: PropTypes.string,
    isPublication: PropTypes.bool,
    isTribus: PropTypes.bool,
    isAggregate: PropTypes.bool,
    uri: PropTypes.func,
  }),
};

LosNameList.defaultProps = {
  list: undefined,
  losNameOptions: {},
};
