import React, { useState } from 'react';

import {
  Grid, IconButton, Paper, Popover, Typography,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import TitledSection from './Components/TitledSection';

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    padding: theme.spacing(2),
  },
  ul: {
    paddingInlineStart: theme.spacing(2),
  },
}));

const Legend = ({ category, anchorEl, onClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const transl = t(`category.legend.${category}`, { returnObjects: true });

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Paper className={classes.popoverPaper}>
        <ul className={classes.ul}>
          {transl.map((o, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>{o}</li>
          ))}
        </ul>
      </Paper>
    </Popover>
  );
};

const ValueWithHelp = ({ value, category }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickHelp = (e) => setAnchorEl(e.currentTarget);
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        {value}
      </Grid>
      <Grid item xs={6}>
        <Typography align="right">
          <IconButton aria-label="help" onClick={handleClickHelp}>
            <HelpIcon fontSize="small" />
          </IconButton>
        </Typography>
        <Legend
          category={category}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        />
      </Grid>
    </Grid>
  );
};

const NameDetailCategories = ({ data = {} }) => {
  const { t } = useTranslation();

  const {
    origin, cultivation, invasiveness, residenceTime, endemism,
    threat, protection, protectionLegacy,
  } = data;

  return (
    <>
      <TitledSection
        showWhen={!!origin}
        title={t('category.title.origin')}
      >
        <ValueWithHelp value={origin} category="origin" />
      </TitledSection>
      <TitledSection
        showWhen={!!cultivation}
        title={t('category.title.cultivation')}
      >
        <ValueWithHelp value={cultivation} category="cultivation" />
      </TitledSection>
      <TitledSection
        showWhen={!!invasiveness}
        title={t('category.title.invasiveness')}
      >
        <ValueWithHelp value={invasiveness} category="invasiveness" />
      </TitledSection>
      <TitledSection
        showWhen={!!residenceTime}
        title={t('category.title.residenceTime')}
      >
        <ValueWithHelp value={residenceTime} category="residenceTime" />
      </TitledSection>
      <TitledSection
        showWhen={!!endemism}
        title={t('category.title.endemism')}
      >
        <ValueWithHelp value={endemism} category="endemism" />
      </TitledSection>
      <TitledSection
        showWhen={!!threat}
        title={t('category.title.threat')}
      >
        <ValueWithHelp value={threat} category="threat" />
      </TitledSection>
      <TitledSection
        showWhen={!!protectionLegacy}
        title={t('category.title.protectionLegacy')}
      >
        <ValueWithHelp value={protectionLegacy} category="protectionLegacy" />
      </TitledSection>
      <TitledSection
        showWhen={!!protection}
        title={t('category.title.protection')}
      >
        <ValueWithHelp value={protection} category="protection" />
      </TitledSection>
    </>
  );
};

export default NameDetailCategories;

NameDetailCategories.propTypes = {
  data: PropTypes.shape({
    origin: PropTypes.string,
    cultivation: PropTypes.string,
    invasiveness: PropTypes.string,
    residenceTime: PropTypes.string,
    endemism: PropTypes.string,
    threat: PropTypes.string,
    protection: PropTypes.string,
    protectionLegacy: PropTypes.string,
  }),
};

NameDetailCategories.defaultProps = {
  data: {},
};

ValueWithHelp.propTypes = {
  value: PropTypes.string,
  category: PropTypes.string.isRequired,
};

ValueWithHelp.defaultProps = {
  value: undefined,
};

Legend.propTypes = {
  category: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

Legend.defaultProps = {
  anchorEl: null,
};
