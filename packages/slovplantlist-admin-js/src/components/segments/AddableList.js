import React, { useRef } from 'react';

import {
  Col,
  Button, Glyphicon,
  FormGroup, InputGroup,
  ListGroup, ListGroupItem,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import { useAsyncTypeahead } from '@ibot/core/lib/hooks/typeahead';

const AddableList = ({
  id,
  async = false,
  editable = true,
  data = [],
  options: propsOptions = [],
  onSearch,
  onAddItemToList,
  onRowDelete,
  getRowId,
  itemComponent: ListRowItem,
  accessToken = '', // pass when onSearch function requires it
  optionsLabelKey,
  renderMenu,
  ...itemSpecificProps
}) => {
  const {
    selected,
    results: stateOptions,
    isLoading,
    doSearch,
    handleChangeTypeahead,
  } = useAsyncTypeahead(onSearch, [], accessToken);

  const typeaheadRef = useRef();

  const handleAddItem = () => {
    if (selected && selected.length > 0) {
      onAddItemToList(selected[0]);
      typeaheadRef.current.clear();
      handleChangeTypeahead([]);
    }
  };

  const renderTypeahead = () => {
    if (async) {
      return (
        <AsyncTypeahead
          id={id}
          labelKey={optionsLabelKey}
          size="sm"
          ref={typeaheadRef}
          isLoading={isLoading}
          options={stateOptions}
          onChange={handleChangeTypeahead}
          selected={selected}
          onSearch={doSearch}
          placeholder="Start by typing (case sensitive)"
          renderMenu={renderMenu}
        />
      );
    }
    return (
      <Typeahead
        id={id}
        size="sm"
        ref={typeaheadRef}
        options={propsOptions}
        onChange={handleChangeTypeahead}
        selected={selected}
        placeholder="Start by typing"
        renderMenu={renderMenu}
      />
    );
  };

  return (
    <div className="addable-list compact-list">
      <ListGroup>
        {
          // row must contain id, props is the rest
          // ListRow is an injected component that will be rendered as item
          data.map((d, index) => {
            const rowId = getRowId ? getRowId(d) : index;
            return (
              <ListRowItem
                editable={editable}
                rowId={rowId}
                key={rowId}
                data={d}
                onRowDelete={() => onRowDelete(rowId)}
                // in the rest of the props are custom properties per item
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...itemSpecificProps}
              />
            );
          })
        }
        {editable && (
          <ListGroupItem>
            <FormGroup>
              <Col sm={12}>
                <InputGroup bsSize="sm">
                  {renderTypeahead()}
                  <InputGroup.Button>
                    <Button
                      bsStyle="success"
                      onClick={handleAddItem}
                      disabled={!selected || selected.length < 1}
                      title="Add to this list"
                    >
                      <Glyphicon glyph="plus" />
                      {' '}
                      Add
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </Col>
            </FormGroup>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
};

export default AddableList;

AddableList.propTypes = {
  id: PropTypes.string,
  optionsLabelKey: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  options: PropTypes.arrayOf(PropTypes.object),
  itemComponent: PropTypes.func.isRequired,
  renderMenu: PropTypes.func,
  getRowId: PropTypes.func,
  onAddItemToList: PropTypes.func.isRequired,
  onRowDelete: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  async: PropTypes.bool,
  editable: PropTypes.bool,
  accessToken: PropTypes.string,
};

AddableList.defaultProps = {
  id: undefined,
  optionsLabelKey: 'label',
  data: [],
  options: undefined,
  async: false,
  editable: true,
  onSearch: undefined,
  renderMenu: undefined,
  getRowId: undefined,
  accessToken: '',
};
