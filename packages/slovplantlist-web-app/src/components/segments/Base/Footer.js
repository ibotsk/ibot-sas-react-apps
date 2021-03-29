import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Container,
  List, ListItem, ListItemText,
  Divider, Grid, Typography,
} from '@material-ui/core';

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
              Useful Databases worldwide
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
                <ListItemLink href="http://dataflos.sav.sk">
                  <ListItemTextFooter
                    primary="Dataflos – Databáza flóry Slovenska"
                  />
                </ListItemLink>
                <ListItemLink href="https://www.chromosomes.sav.sk">
                  <ListItemTextFooter
                    primary="Karyological database of the ferns
                  and flowering plants of Slovakia"
                  />
                </ListItemLink>
                <ListItemLink href="http://dass.sav.sk/en/">
                  <ListItemTextFooter
                    primary="Database of non-native plant species of Slovakia"
                  />
                </ListItemLink>
                <ListItemLink href="https://ibot.sav.sk/cdf/index_en.html">
                  <ListItemTextFooter
                    primary="CDF – Central database of phytocenological relevés"
                  />
                </ListItemLink>
                <ListItemLink href="https://pladias.cz/en/">
                  <ListItemTextFooter
                    primary="PLADIAS – Database of the Czech Flora and
                    Vegetation"
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
                <ListItemLink href="https://www.emplantbase.org/home.html">
                  <ListItemTextFooter
                    primary="Euro+Med PlantBase"
                  />
                </ListItemLink>
                <ListItemLink href="https://www.ipni.org/">
                  <ListItemTextFooter
                    primary="International Plant Name Index (IPNI)"
                  />
                </ListItemLink>
                <ListItemLink href="http://powo.science.kew.org/">
                  <ListItemTextFooter
                    primary="Plants of the World online"
                  />
                </ListItemLink>
                <ListItemLink href="https://www.tropicos.org/home">
                  <ListItemTextFooter
                    primary="Tropicos"
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
