import React from 'react';
import { generatePath, Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import { LosName } from '@ibot/components';

import { useTranslation } from 'react-i18next';

import config from 'config';

import TitledSection from './Components/TitledSection';
import NameList from './Components/NameList';

const { routes: routesConfig } = config;

const NameDetailSynonym = ({
  acceptedNames = [],
}) => {
  const { t } = useTranslation();

  const acceptedNamesLos = acceptedNames.map((name) => ({
    id: name.id,
    name: (
      <LosName
        data={name}
        format="italic"
        component={RouterLink}
        to={generatePath(routesConfig.nameDetail.route, { id: name.id })}
      />
    ),
  }));
  return (
    <>
      <TitledSection title={t('Accepted name')}>
        <NameList list={acceptedNamesLos} />
      </TitledSection>
    </>
  );
};

export default NameDetailSynonym;

NameDetailSynonym.propTypes = {
  acceptedNames: PropTypes.arrayOf(PropTypes.object),
};
NameDetailSynonym.defaultProps = {
  acceptedNames: [],
};
