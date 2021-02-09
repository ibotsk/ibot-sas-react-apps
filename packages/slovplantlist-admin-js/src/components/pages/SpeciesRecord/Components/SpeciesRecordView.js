import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Grid, Col, Row, Panel, Button,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import PropTypes from 'prop-types';
import SynonymType from 'components/propTypes/synonym';

import { LosName, LosNameList, SynonymsList } from '@ibot/components';

import { speciesFacade } from 'facades';

import config from 'config/config';

const CHECKLIST_LIST_URI = '/checklist';

const MisidentificationAuthor = ({ item }) => (
  <div className="checklist-subinfo">
    Misidentified by:
    {' '}
    {
      `${item.misidentificationAuthor || '-'}`
    }
  </div>
);

const SpeciesRecordView = ({ recordId }) => {
  const [record, setRecord] = useState();
  const [accepted, setAccepted] = useState([]);
  const [basionym, setBasionym] = useState();
  const [replaced, setReplaced] = useState();
  const [nomenNovum, setNomenNovum] = useState();
  const [genus, setGenus] = useState();
  const [familyApg, setFamilyApg] = useState();
  const [family, setFamily] = useState();
  const [nomenclatoricSynonyms, setNomenclatoricSynonyms] = useState([]);
  const [taxonomicSynonyms, setTaxonomicSynonyms] = useState([]);
  const [misidentifications, setMisidentifications] = useState([]);
  const [invalidDesignations, setInvalidDesignations] = useState([]);
  const [basionymFor, setBasionymFor] = useState([]);
  const [replacedFor, setReplacedFor] = useState([]);
  const [nomenNovumFor, setNomenNovumFor] = useState([]);

  const accessToken = useSelector((state) => state.authentication.accessToken);

  useEffect(() => {
    const fetch = async () => {
      if (recordId) {
        const {
          speciesRecord,
          accepted: _accepted,
          basionym: _basionym,
          replaced: _replaced,
          nomenNovum: _nomenNovum,
          genus: _genus, familyApg: _familyApg, family: _family,
        } = await speciesFacade.getRecordById(recordId, accessToken);

        const {
          nomenclatoricSynonyms: _nomenclatoricSynonyms,
          taxonomicSynonyms: _taxonomicSynonyms,
          invalidDesignations: _invalidDesignations,
          misidentifications: _misidentifications,
        } = await speciesFacade.getSynonyms(recordId, accessToken);
        const {
          basionymFor: _basionymFor,
          replacedFor: _replacedFor,
          nomenNovumFor: _nomenNovumFor,
        } = await speciesFacade.getBasionymsFor(recordId, accessToken);

        setRecord(speciesRecord);
        setAccepted(_accepted);
        setBasionym(_basionym);
        setReplaced(_replaced);
        setNomenNovum(_nomenNovum);
        setGenus(_genus);
        setFamilyApg(_familyApg);
        setFamily(_family);
        setNomenclatoricSynonyms(_nomenclatoricSynonyms);
        setTaxonomicSynonyms(_taxonomicSynonyms);
        setMisidentifications(_misidentifications);
        setInvalidDesignations(_invalidDesignations);
        setBasionymFor(_basionymFor);
        setReplacedFor(_replacedFor);
        setNomenNovumFor(_nomenNovumFor);
      }
    };

    fetch();
  }, [accessToken, recordId]);

  if (!record) {
    return null;
  }
  const {
    ntype, publication, vernacular, tribus,
  } = record;
  const type = config.mappings.losType[ntype];
  return (
    <div id="species-detail">
      <Grid id="functions-panel">
        <div id="functions">
          <Row>
            <Col sm={5} smOffset={2}>
              <LinkContainer to={CHECKLIST_LIST_URI}>
                <Button bsStyle="default">Back</Button>
              </LinkContainer>
            </Col>
          </Row>
        </div>
      </Grid>
      <hr />
      <Grid>
        <h2><LosName data={record} /></h2>
        <div id="name">
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Type</dt>
                <dd>{type.text || ''}</dd>
              </dl>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Family APG</dt>
                <dd>{familyApg || '-'}</dd>
                <dt>Family</dt>
                <dd>{family || '-'}</dd>
                <dt>Genus (reference)</dt>
                <dd>{genus ? genus[0].label : '-'}</dd>
              </dl>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Species</dt>
                <dd><LosName data={record} /></dd>
                <dt>Aggregate</dt>
                <dd>{record.aggregate || '-'}</dd>
                <dt>Subaggregate</dt>
                <dd>{record.subaggregate || '-'}</dd>
              </dl>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Publication</dt>
                <dd>{publication || '-'}</dd>
                <dt>Vernacular</dt>
                <dd>{vernacular || '-'}</dd>
                <dt>Tribus</dt>
                <dd>{tribus || '-'}</dd>
              </dl>
            </Panel.Body>
          </Panel>
        </div>
        <div id="associations">
          <h3>Associations</h3>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Accepted name(s)</dt>
                <dd>
                  <LosNameList list={accepted.map(({ parent }) => parent)} />
                </dd>
              </dl>
            </Panel.Body>
          </Panel>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Basionym</dt>
                <dd>{basionym ? basionym[0].label : '-'}</dd>
                <dt>Replaced name</dt>
                <dd>{replaced ? replaced[0].label : '-'}</dd>
                <dt>Nomen novum</dt>
                <dd>{nomenNovum ? nomenNovum[0].label : '-'}</dd>
              </dl>
            </Panel.Body>
          </Panel>
        </div>
        <div id="synonyms">
          <h3>Synonyms</h3>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Nomenclatoric Synonyms</dt>
                <dd>
                  <SynonymsList
                    list={nomenclatoricSynonyms}
                    prefix={config.mappings.synonym.nomenclatoric.prefix}
                  />
                </dd>
                <dt>Taxonomic Synonyms</dt>
                <dd>
                  <SynonymsList
                    list={taxonomicSynonyms}
                    prefix={config.mappings.synonym.taxonomic.prefix}
                  />
                </dd>
                <dt>Invalid Designations</dt>
                <dd>
                  <SynonymsList
                    list={invalidDesignations}
                    prefix={config.mappings.synonym.invalid.prefix}
                  />
                </dd>
                <dt>Misidentifications</dt>
                <dd>
                  <SynonymsList
                    list={misidentifications}
                    prefix={config.mappings.synonym.misidentification.prefix}
                    addition={MisidentificationAuthor}
                  />
                </dd>
              </dl>
            </Panel.Body>
          </Panel>
        </div>
        <div id="associations-inherited">
          <h3>Inherited associations</h3>
          <Panel>
            <Panel.Body>
              <dl className="dl-horizontal">
                <dt>Basionym For</dt>
                <dd>
                  <LosNameList list={basionymFor} />
                </dd>
                <dt>Replaced For</dt>
                <dd>
                  <LosNameList list={replacedFor} />
                </dd>
                <dt>Nomen Novum For</dt>
                <dd>
                  <LosNameList list={nomenNovumFor} />
                </dd>
              </dl>
            </Panel.Body>
          </Panel>
        </div>

        <div id="controls">
          <Row>
            <Col sm={5} smOffset={2}>
              <LinkContainer to={CHECKLIST_LIST_URI}>
                <Button bsStyle="default">Back</Button>
              </LinkContainer>
            </Col>
          </Row>
        </div>
      </Grid>
    </div>
  );
};

export default SpeciesRecordView;

SpeciesRecordView.propTypes = {
  recordId: PropTypes.string,
};

SpeciesRecordView.defaultProps = {
  recordId: undefined,
};

MisidentificationAuthor.propTypes = {
  item: SynonymType.type.isRequired,
};
