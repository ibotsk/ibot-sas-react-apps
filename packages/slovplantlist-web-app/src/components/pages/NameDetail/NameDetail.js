import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import {
  Box, Container, Tabs, Tab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PageTitle } from '@ibot/components';
import { species as speciesUtils } from '@ibot/utils';

import { useTranslation } from 'react-i18next';

import {
  nomencatureService,
  genusService,
} from 'services';
import config from 'config';

import TabPanel from 'components/segments/Common/TabPanel';
import NameTitleSection from './Components/NameTitleSection';

import NameDetailOverview from './NameDetailOverview';
import NameDetailStatus from './NameDetailStatus';

const {
  status: statusConfig,
} = config;

const getStatusText = (ntype) => (
  statusConfig[ntype] ? statusConfig[ntype].i18nKey : ''
);

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: theme.spacing(4),
  },
  root: {
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },
  nameDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const NameDetail = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const [record, setRecord] = useState({});

  const [synonymsNomenclatoric, setSynonymsNomenclatoric] = useState([]);
  const [synonymsTaxonomic, setSynonymsTaxonomic] = useState([]);
  const [synonymsOthers, setSynonymsOthers] = useState([]);
  const [invalidDesignations, setInvalidDesignations] = useState([]);
  const [misidentifications, setMisidentifications] = useState([]);

  const [familyAPG, setFamilyAPG] = useState();

  const [forRelations, setForRelations] = useState({});

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

      const forRelationsRecords = await nomencatureService
        .getForRelationsOfId(id);

      setRecord(nomenRecord);
      setFamilyAPG(familyRecord);
      setSynonymsNomenclatoric(synonyms.nomenclatoricSynonyms);
      setSynonymsTaxonomic(synonyms.taxonomicSynonyms);
      setSynonymsOthers(synonyms.otherSynonyms);
      setInvalidDesignations(invalidDesigRecords);
      setMisidentifications(misidentificationsRecords);
      setForRelations(forRelationsRecords);
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
    nomenStatus,
    ...name
  } = record;

  return (
    <Box className={classes.root}>
      <PageTitle
        websiteTitle="Slovplantlist"
        title={speciesUtils.listOfSpeciesString(name)}
      />
      <NameTitleSection
        name={name}
        status={t(getStatusText(status))}
        publication={publication}
        genus={genusReference}
        familyAPG={familyAPG}
        vernacular={name.vernacular}
      />
      <Container maxWidth="md">
        <Tabs
          className={classes.tabs}
          value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, newTab) => setActiveTab(newTab)}
          aria-label="Name details tabs"
        >
          <Tab label="Overview" />
          <Tab label="Name status" />
        </Tabs>
        <TabPanel value={activeTab} index={0}>
          <NameDetailOverview
            status={status}
            acceptedNames={acceptedNames}
            synonyms={{
              synonymsNomenclatoric,
              synonymsTaxonomic,
              synonymsOthers,
            }}
            invalidDesignations={invalidDesignations}
            misidentifications={misidentifications}
            relatives={{
              parentCombination,
              taxonPosition,
              basionym,
              nomenNovum,
              replaced,
            }}
            forRelations={forRelations}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <NameDetailStatus data={nomenStatus} />
        </TabPanel>
      </Container>
    </Box>
  );
};

export default NameDetail;
