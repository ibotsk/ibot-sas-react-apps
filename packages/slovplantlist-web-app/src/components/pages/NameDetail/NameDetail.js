/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import PropTypes from 'prop-types';

import { Container } from '@material-ui/core';

import NameTitleSection from './Components/NameTitleSection';
import TitledSection from './Components/TitledSection';
import NameLabelValue from './Components/NameLabelValue';

import NameDetailAccepted from './NameDetailAccepted';
import NameDetailSynonym from './NameDetailSynonym';

import {
  nomencatureService,
  genusService,
} from '../../../services';
import config from '../../../config';

const {
  status: statusConfig,
} = config;

const makeSynonymList = (length, syntype, subsyns = 0) => (
  [...Array(length).keys()]
    .map(() => ({
      syntype,
      name: 'Lorem ipsum',
      subsynonyms: [...Array(subsyns).keys()]
        .map((i) => ({ id: i, name: 'Lorem ipsum' })),
    }))
);

const getStatusText = (ntype) => (
  statusConfig[ntype] ? statusConfig[ntype].text : ''
);

const NameDetailSpecificByStatus = ({ status, data = {} }) => {
  const {
    synonymsNomenclatoric,
    synonymsTaxonomic,
    acceptedNames,
  } = data;

  switch (status) {
    case statusConfig.A.key:
    case statusConfig.PA.key:
      return (
        <NameDetailAccepted
          synonymsNomenclatoric={synonymsNomenclatoric}
          synonymsTaxonomic={synonymsTaxonomic}
        />
      );
    case statusConfig.S.key:
    case statusConfig.DS.key:
      return (
        <NameDetailSynonym
          acceptedNames={acceptedNames}
        />
      );
    default:
      return null;
  }
};

const NameDetail = () => {
  const { id } = useParams();

  const [record, setRecord] = useState({});

  const [synonymsNomenclatoric, setSynonymsNomenclatoric] = useState([]);
  const [synonymsTaxonomic, setSynonymsTaxonomic] = useState([]);

  const [familyAPG, setFamilyAPG] = useState();

  useEffect(() => {
    const fetch = async () => {
      const nomenRecord = await nomencatureService.getNomenclatureById(id);
      const { genusReference } = nomenRecord || {};

      const familyRecord = await genusService
        .getFamilyApgOfGenus(genusReference);

      setRecord(nomenRecord);
      setSynonymsNomenclatoric(makeSynonymList(2, 3));
      setSynonymsTaxonomic(makeSynonymList(3, 2, 3));
      setFamilyAPG(familyRecord);
    };
    fetch();
  }, [id]);

  const {
    status,
    publication,
    acceptedNames,
    genusReference,
    parentCombination,
    taxonPosition,
    basionym,
    replaced,
    nomenNovum,
    ...name
  } = record;
  return (
    <div>
      <NameTitleSection
        name={name}
        status={getStatusText(status)}
        publication={publication}
        genus={genusReference}
        familyAPG={familyAPG}
      />
      <Container maxWidth="md">
        <NameDetailSpecificByStatus
          status={status}
          data={{
            acceptedNames,
          }}
        />
        <TitledSection title="Related names">
          <NameLabelValue label="Basionym" data={basionym} />
          <NameLabelValue label="Nomen novum" data={nomenNovum} />
          <NameLabelValue label="Replaced" data={replaced} />
        </TitledSection>
      </Container>
    </div>
  );
};

export default NameDetail;

NameDetailSpecificByStatus.propTypes = {
  status: PropTypes.string,
  data: PropTypes.shape({
    acceptedNames: PropTypes.arrayOf(PropTypes.object),
    synonymsNomenclatoric: PropTypes.arrayOf(PropTypes.object),
    synonymsTaxonomic: PropTypes.arrayOf(PropTypes.object),
  }),
};

NameDetailSpecificByStatus.defaultProps = {
  status: undefined,
  data: {},
};
