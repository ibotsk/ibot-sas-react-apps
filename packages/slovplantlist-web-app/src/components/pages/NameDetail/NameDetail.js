import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper } from '@material-ui/core';

import TitledSection from './Components/TitledSection';
import NameTitleSection from './Components/NameTitleSection';

import config from '../../../config';

const { status } = config;

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    width: '100%',
    marginTop: '-32px',
  },
  titlePaper: {
    height: 200,
  },
}));

const nameRecord = {
  ntype: 'A',
  hybrid: false,
  genus: 'Lorem',
  species: 'ipsum',
  subsp: 'ipsum',
  var: null,
  subvar: null,
  forma: null,
  nothosubsp: null,
  nothoforma: null,
  proles: null,
  unranked: null,
  authors: 'Dolor.',
  genusH: null,
  speciesH: null,
  subspH: null,
  varH: null,
  subvarH: null,
  formaH: null,
  nothosubspH: null,
  nothoformaH: null,
  authorsH: null,
  publication: 'Curabitur ornare condimentum est',
  tribus: null,
  vernacular: 'Slovenske meno',
  ntypeOrder: 1,
  isIsonym: false,
  isBasionym: false,
  notes: null,
  aggregate: null,
  subaggregate: null,
  id: 1,
};

const NameDetail = () => {
  const classes = useStyles();
  const [record, setRecord] = useState(nameRecord);

  const { ntype, ...name } = record;
  return (
    <div>
      <NameTitleSection
        name={name}
        status={status[ntype].text}
        publication={name.publication}
      />
      <Container maxWidth="md">
        <TitledSection title="Section">
          Some content
        </TitledSection>
      </Container>
    </div>
  );
};

export default NameDetail;
