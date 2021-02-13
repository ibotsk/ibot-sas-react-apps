import React from 'react';
import { ListGroup } from 'react-bootstrap';

import SynonymListItem from './SynonymListItem';
import LosName from '../Names/LosName';

const SynonymsList = ({ list, prefix, addition: Addition = undefined }) => {
  if (list && list.length) {
    return (
      <ListGroup>
        {
          list.map((s) => (
            <SynonymListItem
              data={s}
              prefix={prefix}
              key={s.id}
              additions={Addition ? () => (<Addition item={s} />) : undefined}
              nameComponent={LosName}
            />
          ))
        }
      </ListGroup>
    );
  }
  return '-';
};

export default SynonymsList;
