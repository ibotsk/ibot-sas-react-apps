/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Container, Divider } from '@material-ui/core';

import NameTitleSection from './Components/NameTitleSection';
import TitledSection from './Components/TitledSection';
import NameLabelValue from './Components/NameLabelValue';
import SynonymList from './Components/SynonymList';
import {
  SynonymListItemBasic,
  SynonymListItemTaxonomic,
} from './Components/SynonymListItems';

import NameDetailAccepted from './NameDetailAccepted';
import NameDetailSynonym from './NameDetailSynonym';

import {
  nomencatureService,
  genusService,
} from '../../../services';
import config from '../../../config';

const {
  status: statusConfig,
  synonyms: synonymsConfig,
} = config;

const getStatusText = (ntype) => (
  statusConfig[ntype] ? statusConfig[ntype].text : ''
);

const NameDetail = () => {
  const { id } = useParams();

  const [record, setRecord] = useState({});

  const [synonymsNomenclatoric, setSynonymsNomenclatoric] = useState([]);
  const [synonymsTaxonomic, setSynonymsTaxonomic] = useState([]);
  const [synonymsOthers, setSynonymsOthers] = useState([]);
  const [invalidDesignations, setInvalidDesignations] = useState([]);
  const [misidentifications, setMisidentifications] = useState([]);

  const [familyAPG, setFamilyAPG] = useState();

  useEffect(() => {
    const fetch = async () => {
      const nomenRecord = await nomencatureService.getNomenclatureById(id);
      const { genusReference } = nomenRecord || {};

      const familyRecord = await genusService
        .getFamilyApgOfGenus(genusReference);

      const synonyms = await nomencatureService.getSynonymsOfId(id);
      const invalidDesigRecords = await nomencatureService
        .getInvalidDesignationsOfId(id);
      const misidentificationsRecords = await nomencatureService
        .getMisidentificationsOfId(id);

      setRecord(nomenRecord);
      setFamilyAPG(familyRecord);
      setSynonymsNomenclatoric(synonyms.nomenclatoricSynonyms);
      setSynonymsTaxonomic(synonyms.taxonomicSynonyms);
      setSynonymsOthers(synonyms.otherSynonyms);
      setInvalidDesignations(invalidDesigRecords);
      setMisidentifications(misidentificationsRecords);
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
        {[statusConfig.S.key, statusConfig.DS.key].includes(status) && (
          <NameDetailSynonym
            acceptedNames={acceptedNames}
          />
        )}
        <TitledSection title="Synonyms">
          <SynonymList
            syntype={synonymsConfig.nomenclatoric.syntype}
            synonyms={synonymsNomenclatoric}
            item={SynonymListItemBasic}
          />
          {(synonymsNomenclatoric.length > 0
            && synonymsTaxonomic.length > 0)
            && (
              <Divider />
            )
          }
          <SynonymList
            syntype={synonymsConfig.taxonomic.syntype}
            synonyms={synonymsTaxonomic}
            item={SynonymListItemTaxonomic}
          />
          {(synonymsTaxonomic.length > 0 && synonymsOthers.length > 0) && (
            <Divider />
          )}
          <SynonymList
            syntype={synonymsConfig.other.syntype}
            synonyms={synonymsOthers}
            item={SynonymListItemBasic}
          />
        </TitledSection>
        {[statusConfig.A.key, statusConfig.PA.key].includes(status) && (
          <NameDetailAccepted
            invalidDesignations={invalidDesignations}
            misidentifications={misidentifications}
          />
        )}
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
