/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';

import config from 'config';

import TitledSection from './Components/TitledSection';
import NameLabelValue from './Components/NameLabelValue';
import NameLabelList from './Components/NameLabelList';
import SynonymList from './Components/SynonymList';

import {
  SynonymListItemBasic,
  SynonymListItemTaxonomic,
} from './Components/SynonymListItems';

import NameDetailAccepted from './NameDetailAccepted';
import NameDetailSynonym from './NameDetailSynonym';

const {
  status: statusConfig,
  synonyms: synonymsConfig,
} = config;

const {
  A: { key: A },
  PA: { key: PA },
  S: { key: S },
  DS: { key: DS },
  PC: { key: PC },
  TP: { key: TP },
} = statusConfig;

const useStyles = makeStyles((theme) => ({
  nameDivider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const NameDetailOverview = ({
  status,
  acceptedNames = [], synonyms = {},
  invalidDesignations = [], misidentifications = [],
  relatives = {}, forRelations = {},
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    synonymsNomenclatoric,
    synonymsTaxonomic,
    synonymsOthers,
  } = synonyms;
  const {
    parentCombination,
    taxonPosition,
    basionym,
    nomenNovum,
    replaced,
  } = relatives;
  const {
    parentCombinationFor,
    taxonPositionFor,
    basionymFor,
    nomenNovumFor,
    replacedFor,
  } = forRelations;

  return (
    <>
      {[S, DS].includes(status) && (
        <NameDetailSynonym
          acceptedNames={acceptedNames}
        />
      )}
      <TitledSection
        title={t('Synonyms')}
        hideWhen={[PC, TP].includes(status)}
      >
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
      {[A, PA].includes(status) && (
        <NameDetailAccepted
          invalidDesignations={invalidDesignations}
          misidentifications={misidentifications}
        />
      )}
      <TitledSection
        title={t('Related names')}
        hideWhen={[PC, TP].includes(status)}
      >
        <NameLabelValue
          label={t('Parent combination notation')}
          data={parentCombination}
        />
        <NameLabelValue label={t('Taxon position')} data={taxonPosition} />
        <Divider className={classes.nameDivider} />
        <NameLabelValue label={t('Basionym')} data={basionym} />
        <NameLabelValue label={t('Nomen novum')} data={nomenNovum} />
        <NameLabelValue label={t('Replaced')} data={replaced} />
      </TitledSection>

      <TitledSection
        title={t('Is used as')}
      >
        <NameLabelList
          label={t('Parent combination for')}
          listOfNames={parentCombinationFor}
        />
        <Divider className={classes.nameDivider} />
        <NameLabelList
          label={t('Taxon position for')}
          listOfNames={taxonPositionFor}
        />
        <Divider className={classes.nameDivider} />
        <NameLabelList label={t('Basionym for')} listOfNames={basionymFor} />
        <Divider className={classes.nameDivider} />
        <NameLabelList
          label={t('Nomen novum for')}
          listOfNames={nomenNovumFor}
        />
        <Divider className={classes.nameDivider} />
        <NameLabelList label={t('Replaced for')} listOfNames={replacedFor} />
      </TitledSection>
    </>
  );
};

export default NameDetailOverview;

NameDetailOverview.propTypes = {
  status: PropTypes.string,
  acceptedNames: PropTypes.arrayOf(PropTypes.object),
  synonyms: PropTypes.shape({
    synonymsNomenclatoric: PropTypes.arrayOf(PropTypes.object),
    synonymsTaxonomic: PropTypes.arrayOf(PropTypes.object),
    synonymsOthers: PropTypes.arrayOf(PropTypes.object),
  }),
  invalidDesignations: PropTypes.arrayOf(PropTypes.object),
  misidentifications: PropTypes.arrayOf(PropTypes.object),
  relatives: PropTypes.shape({
    parentCombination: PropTypes.object,
    taxonPosition: PropTypes.object,
    basionym: PropTypes.object,
    nomenNovum: PropTypes.object,
    replaced: PropTypes.object,
  }),
  forRelations: PropTypes.shape({
    parentCombinationFor: PropTypes.arrayOf(PropTypes.object),
    taxonPositionFor: PropTypes.arrayOf(PropTypes.object),
    basionymFor: PropTypes.arrayOf(PropTypes.object),
    nomenNovumFor: PropTypes.arrayOf(PropTypes.object),
    replacedFor: PropTypes.arrayOf(PropTypes.object),
  }),
};

NameDetailOverview.defaultProps = {
  status: undefined,
  acceptedNames: [],
  synonyms: {},
  invalidDesignations: [],
  misidentifications: [],
  relatives: {},
  forRelations: {},
};
