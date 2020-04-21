import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_COLOR } from 'consts';

import './Cell.scss';

const Cell = ({ size, color }) => {
  const cellStyle = {
    width: size,
    height: size,
    backgroundColor: color
  };

  return (
    <div className="cell" style={cellStyle} />
  );
};

Cell.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
};

Cell.defaultProps = {
  size: 50,
  color: DEFAULT_COLOR
};

export default Cell;
