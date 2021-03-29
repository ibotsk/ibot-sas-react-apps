import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Link, Paper, Typography,
} from '@material-ui/core';
import { PageTitle } from '@ibot/components';

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

const Home = () => {
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
            SlovPlantList – the database of the names of vascular
            plants of Slovakia
          </Typography>
          <Typography paragraph variant="body2">
            The database presents the results of the latest revision of the
            diversity of vascular plants in Slovakia in the form of an overview
            of their accepted names and synonyms, in accordance with the valid
            international code of botanical nomenclature (
            <Link
              href="https://www.iapt-taxon.org/nomen/main.php"
              color="secondary"
            >
              Turland et al. 2018
            </Link>
            ). It includes all families, genera, species and infraspecific taxa
            that have been recorded in the territory ofthe Slovak Republic so
            far. In addition to spontaneous, native and non-native taxa, it
            also provides an overview of more frequently cultivated species.
            The web version of this reference checklist allows it to be
            continuously updated. It takes into account the most recent
            taxonomic, chorologic and nomenclatoric studies and also presents
            the Slovak national nomenclature of the vascular plants, revised
            and approved by the Nomenclature Commission of
            {' '}
            <Link
              href="http://sbs.sav.sk/SBS1/supplements.html"
              color="secondary"
            >
              the Slovak Botanical  Society at the Slovak Academy of Sciences
            </Link>
            {' '}
            with the application of the latest principles (
            <Link
              // eslint-disable-next-line max-len
              href="http://sbs.sav.sk/SBS1/bulletins/docs/supplement/BSBS-2017-roc39-supplement1.pdf"
              color="secondary"
            >
              Kliment et al. 2017
            </Link>
            ). In addition to the
            correct scientific and national names and their synonyms, each
            taxon is also associated with information on its origin and invasion
            status (
            <Link
              href="http://dass.sav.sk/"
              color="secondary"
            >
              Medvecká et al. 2012
            </Link>
            ), endemism (
            <Link
              href="http://sbs.sav.sk/SBS1/supplements.html"
              color="secondary"
            >
              Kliment 1999
            </Link>
            ,
            {' '}
            <Link
              href="http://www.preslia.cz/P161Kliment.pdf"
              color="secondary"
            >
              Kliment et al. 2016
            </Link>
            ), red-list category of threat (
            <Link
              // eslint-disable-next-line max-len
              href="https://www.researchgate.net/publication/273058603_Red_list_of_ferns_and_flowering_plants_of_Slovakia_5th_edition_October_2014"
              color="secondary"
            >
              Eliáš et al. 2015
            </Link>
            ) and legislative protection (
            <Link
              // eslint-disable-next-line max-len
              href="http://www.sopsr.sk/files/24_2003_vyhlaska_OPaK_od_01_01_2015.pdf"
              color="secondary"
            >
              Vyhláška 24/2003
            </Link>
            ).
          </Typography>
          <Typography paragraph variant="body2">
            The authors of the database:
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
            Institute of Botany, Center of Plant Biology and Biodiversity,
            Slovak Academy of Sciences, Dúbravská cesta 9, 845 23 Bratislava
            <br />
            <sup>2</sup>
            {' '}
            Botanical Garden of the Comenius University in Bratislava, the
            workplace Blatnica, 038 15 Blatnica 315
          </Typography>
          <Typography paragraph variant="body2">
            The main source of the database:
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
            cievnatých rastlín [The compendium of the flora of Slovakia. The
            identification key of the vascular plants]. Bratislava, Veda,
            in press.
          </Typography>
          <Typography paragraph variant="body2">
            The authorship of hitherto unpublished treatments of some
            taxonomically complicated genera:
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
            – J. Prančl; Taraxacum – J. Štěpánek, B.
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
            The creation of the database was supported by the Scientific Grant
            Agency of the Ministry of Education, Science, Research and Sport of
            the Slovak Republic and the Slovak Academy of Sciences (the project
            VEGA 2/0137/17).
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Home;
