import React from 'react';

import PropTypes from 'prop-types';

import 'styles/spinner.css';

const SpinnerOverlay = ({ show }) => (
  <>
    {show && (
      <div
        style={{
          position: 'absolute',
          top: '600px',
          width: '100%',
          zIndex: 9999,
        }}
      >
        <div id="floatingCirclesG">
          <div className="f_circleG" id="frotateG_01" />
          <div className="f_circleG" id="frotateG_02" />
          <div className="f_circleG" id="frotateG_03" />
          <div className="f_circleG" id="frotateG_04" />
          <div className="f_circleG" id="frotateG_05" />
          <div className="f_circleG" id="frotateG_06" />
          <div className="f_circleG" id="frotateG_07" />
          <div className="f_circleG" id="frotateG_08" />
        </div>
      </div>
    )}
  </>
);

export default SpinnerOverlay;

SpinnerOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
};
