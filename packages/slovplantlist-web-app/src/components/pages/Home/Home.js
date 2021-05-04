import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Link, Paper, Typography,
} from '@material-ui/core';
import { PageTitle } from '@ibot/components';

import { useTranslation, Trans } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: 15,
    textAlign: 'justify',
  },
}));

const LinkHome = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link color="secondary" target="_blank" rel="noopener" {...props} />
);

const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <>
      <PageTitle websiteTitle="Slovplantlist" title="Home" />
      <Box>
        <Paper
          className={classes.paper}
          elevation={0}
          variant="outlined"
          square
        >
          <Typography variant="h5" component="h1" gutterBottom>
            {t('home.title')}
          </Typography>
          <Typography paragraph variant="body2">
            <Trans i18nKey="home.description">
              The database presents the results of the latest revision of the
              diversity of vascular plants in Slovakia in the form of an
              overview of their accepted names and synonyms, in accordance with
              the valid international code of botanical nomenclature (
              <LinkHome
                href="https://www.iapt-taxon.org/nomen/main.php"
              >
                Turland et al. 2018
              </LinkHome>
              ). It includes all families, genera, species and infraspecific
              taxa
              that have been recorded in the territory ofthe Slovak Republic so
              far. In addition to spontaneous, native and non-native taxa, it
              also provides an overview of more frequently cultivated species.
              The web version of this reference checklist allows it to be
              continuously updated. It takes into account the most recent
              taxonomic, chorologic and nomenclatoric studies and also presents
              the Slovak national nomenclature of the vascular plants, revised
              and approved by the Nomenclature Commission of
              {' '}
              <LinkHome
                href="http://sbs.sav.sk"
              >
                the Slovak Botanical Society at the Slovak Academy of Sciences
              </LinkHome>
              {' '}
              with the application of the latest principles (
              <LinkHome
                // eslint-disable-next-line max-len
                href="http://sbs.sav.sk/SBS1/bulletins/docs/supplement/BSBS-2017-roc39-supplement1.pdf"
              >
                Kliment et al. 2017
              </LinkHome>
              ). In addition to the
              correct scientific and national names and their synonyms, each
              taxon is also associated with information on its origin and
              invasion status (
              <LinkHome
                href="http://dass.sav.sk/"
              >
                Medvecká et al. 2012
              </LinkHome>
              ), endemism (
              <LinkHome
                href="http://sbs.sav.sk/SBS1/supplements.html"
              >
                Kliment 1999
              </LinkHome>
              ,
              {' '}
              <LinkHome
                href="http://www.preslia.cz/P161Kliment.pdf"
              >
                Kliment et al. 2016
              </LinkHome>
              ), red-list category of threat (
              <LinkHome
                // eslint-disable-next-line max-len
                href="https://www.researchgate.net/publication/273058603_Red_list_of_ferns_and_flowering_plants_of_Slovakia_5th_edition_October_2014"
              >
                Eliáš et al. 2015
              </LinkHome>
              ) and legislative protection (
              <LinkHome
                // eslint-disable-next-line max-len
                href="http://www.sopsr.sk/files/24_2003_vyhlaska_OPaK_od_01_01_2015.pdf"
              >
                Vyhláška 24/2003
              </LinkHome>
              ).
            </Trans>
          </Typography>
          <Typography paragraph variant="body2">
            {t('home.authors')}
            :
            <br />
            Dominik Roman Letz
            <sup>1</sup>
            , Matúš Kempa
            <sup>1</sup>
            , Ján Kliment
            <sup>2</sup>
            , Karol Marhold
            <sup>1</sup>
          </Typography>
          <Typography paragraph variant="body2">
            <sup>1</sup>
            {' '}
            {t('home.institution.ibot')}
            <br />
            <sup>2</sup>
            {' '}
            {t('home.institution.bguk')}
          </Typography>
          <Typography paragraph variant="body2">
            {t('home.dbsource')}
            :
            <br />
            Dominik Roman Letz (ed.), Tibor Baranec, František Benčať,
            Dana Bernátová, Petr Bureš, Martin Dančák, Jiří Danihelka, Libor
            Ekrt, Pavol Eliáš jun., Viera Feráková, Petr Filippov, Kornélia
            Goliašová, Vít Grulich, Petr Havlíček, Iva Hodálová, Daniel Hrčka,
            Lubomír Hrouda, Zdenka Hroudová, Jindřich Chrtek jun., Vladimír
            Jehlík, Zdeněk Kaplan, Gergely Király, Jan Kirschner, Ján Kliment,
            Eva Kmeťová, Judita Kochjarová, Martin Kolník, Petr Koutecký, Karel
            Kubát, Jaromír Kučera, Peter Kučera, Martin Lepší, Petr Lepší, Karol
            Marhold, Pavol Mártonfi, Pavol Mereďa jun., Karol Mičieta, Eleonóra
            Michalková, Tatiana Miháliková, Patrik Mráz, Aleš Pečinka, Magdaléna
            Peniašteková, Marián Perný, Jan Prančl, Radomír Řepka, Katarína
            Skokanová, Marek Slovák, Jozef Somogyi, Jan Suda, Jozef Šibík,
            Otakar Šída, Helena Šípošová, Petr Šmarda, Stanislav Španiel, Milan
            Štech, Jan Štěpánek, Jitka Štěpánková, Peter Štrba, Jakub Těšitel,
            Bohumil Trávníček, Peter Turis, Ingrid Turisová, Ondrej Ťavoda,
            Stanislav Uhrin, Milan Valachovič, Radim Jan Vašut, Jiří Velebil,
            Václav Větvička, Jaroslav Vlčko, Mária Zaliberová, Jiří Zázvorka,
            Vojtěch Žíla, 2021: Malá flóra Slovenska. Kľúč na určovanie
            cievnatých rastlín
            {t('home.dbsourceTitle')}
            . Bratislava, Veda, in press.
          </Typography>
          <Typography paragraph variant="body2">
            {t('home.generaAuthorship')}
            :
            {' '}
            <i>Rubus</i>
            {' '}
            – B. Trávníček, P.
            Havlíček, G. Király, V. Žíla;
            {' '}
            <i>Sorbus</i>
            {' '}
            – J. Velebil, D. Bernátová, M. Lepší,
            P. Lepší;
            {' '}
            <i>Callitriche</i>
            {' '}
            – J. Prančl;
            {' '}
            <i>Taraxacum</i>
            {' '}
            – J. Štěpánek, B.
            Trávníček, R. J. Vašut;
            {' '}
            <i>Hieracium</i>
            {' '}
            – J. Chrtek jun., P. Mráz;
            {' '}
            <i>Pilosella</i>
            {' '}
            – J. Chrtek jun., P. Mráz
          </Typography>
          <Typography paragraph variant="body2">
            {t('home.vega')}
          </Typography>

          <Typography variant="h6" component="h2">
            {t('home.techSolutionTitle')}
          </Typography>
          <Typography paragraph variant="body2">
            <Trans i18nKey="home.techSolutionDescription">
              This website is built using a JavaScript library
              {' '}
              <LinkHome href="https://reactjs.org/">
                React
              </LinkHome>
              {' '}
              (v16.14) and
              {' '}
              <LinkHome href="https://material-ui.com/">
                Material-UI
              </LinkHome>
              {' '}
              (v4.11) - a React UI framework. It is deployed as a docker
              container on the server.
              <br />
              The data are stored in the MySQL database. The MySQL server is of
              version 5.7 and it is deployed as a docker container on the
              server.
              <br />
              Between the website and the database lies component that is
              responsible for fetching of the data from the database. It is
              a NodeJs and TypeScript microservice that integrates
              {' '}
              <LinkHome href="https://loopback.io/">
                Loopback 4
              </LinkHome>
              {' '}
              framework. This application is also deployed as a docker container
              on the server.
            </Trans>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Home;
