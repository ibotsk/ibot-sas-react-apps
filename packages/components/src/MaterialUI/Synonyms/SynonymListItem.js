import React from 'react';

import {
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

import PropTypes from 'prop-types';
import { SpeciesType } from '@ibot/types';

// import LosName from '../../Names/LosName';

// const constructSubNomenlatoric = (subNomenclatoricList) => {
//   if (!subNomenclatoricList || subNomenclatoricList.length === 0) {
//     return null;
//   }
//   return (
//     <ListGroup className="synonyms-sublist">
//       {subNomenclatoricList.map((subNomen) => (
//         <ListGroupItem key={subNomen.id} bsSize="sm">
//           <small>
//             ≡
//             {' '}
//             <LosName data={subNomen} />
//           </small>
//         </ListGroupItem>
//       ))}
//     </ListGroup>
//   );
// };

const ItemContent = ({ prefix, children }) => (
  <div>
    {prefix ? `${prefix} ` : ''}
    {children}
  </div>
);

const SynonymListItem = ({
  data,
  prefix,
  additions: Additions,
  nameComponent: NameComponent,
  showSubNomenclatoric = false,
  children,
}) => {
  const { synonym: subject } = data;
  return (
    <div>
      <ListItemText
        primary={(
          <ItemContent prefix={prefix}>
            <NameComponent data={subject} />
          </ItemContent>
        )}
      />
      <ListItemSecondaryAction>
        {Additions && <Additions />}
      </ListItemSecondaryAction>
    </div>
    //   {children}
    //   {showSubNomenclatoric
    //     && constructSubNomenlatoric(
    //       subject['synonyms-nomenclatoric-through'],
    //     )
    //   }
    // </ListGroupItem>
  );
};

export default SynonymListItem;

SynonymListItem.propTypes = {
  data: PropTypes.shape({
    synonym: SpeciesType.isRequired,
  }).isRequired,
  nameComponent: PropTypes.func.isRequired,
  prefix: PropTypes.string.isRequired,
  additions: PropTypes.func,
  showSubNomenclatoric: PropTypes.bool,
  children: PropTypes.element,
};
SynonymListItem.defaultProps = {
  additions: undefined,
  showSubNomenclatoric: false,
  children: undefined,
};

ItemContent.propTypes = {
  prefix: PropTypes.string,
  children: PropTypes.element,
};
ItemContent.defaultProps = {
  prefix: undefined,
  children: undefined,
};
