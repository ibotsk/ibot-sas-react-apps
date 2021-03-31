import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Container,
  List, ListItem, ListItemText,
  Divider, Grid, Typography,
} from '@material-ui/core';

import { useTranslation } from 'react-i18next';

import Copyright from './Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: 200,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  linksContainer: {
    marginBottom: theme.spacing(2),
  },
}));

const ListItemLink = (props) => (
  <ListItem
    dense
    button
    disableGutters
    component="a"
    target="_blank"
    rel="noopener"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

const ListItemTextFooter = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ListItemText disableTypography {...props} />
);

const Footer = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Typography component="div">
      <Box
        className={classes.root}
        bgcolor="primary.light"
        color="primary.contrastText"
        fontWeight="fontWeightLight"
        fontSize={12}
      >
        <Container maxWidth="lg">
          <Typography variant="overline">
            <Box fontSize={14} fontWeight="fontWeightBold">
              {t('Useful Databases worldwide')}
            </Box>
          </Typography>
          <Grid container className={classes.linksContainer} spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <List
                dense
                disablePadding
                component="ul"
                aria-label="useful databases"
              >
                <ListItemLink href={t('databases.dataflos.url')}>
                  <ListItemTextFooter
                    primary={t('databases.dataflos.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.chromosomes.url')}>
                  <ListItemTextFooter
                    primary={t('databases.chromosomes.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.dass.url')}>
                  <ListItemTextFooter
                    primary={t('databases.dass.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.cdf.url')}>
                  <ListItemTextFooter
                    primary={t('databases.cdf.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.pladias.url')}>
                  <ListItemTextFooter
                    primary={t('databases.pladias.text')}
                  />
                </ListItemLink>
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <List
                dense
                disablePadding
                component="ul"
                aria-label="useful databases"
              >
                <ListItemLink href={t('databases.euromed.url')}>
                  <ListItemTextFooter
                    primary={t('databases.euromed.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.ipni.url')}>
                  <ListItemTextFooter
                    primary={t('databases.ipni.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.powo.url')}>
                  <ListItemTextFooter
                    primary={t('databases.powo.text')}
                  />
                </ListItemLink>
                <ListItemLink href={t('databases.tropicos.url')}>
                  <ListItemTextFooter
                    primary={t('databases.tropicos.text')}
                  />
                </ListItemLink>
              </List>
            </Grid>
          </Grid>
          <Divider />
          <Copyright />
        </Container>
      </Box>
    </Typography>
  );
};

export default Footer;
