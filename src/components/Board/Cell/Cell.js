import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { DEFAULT_COLOR } from 'consts';

import './Cell.scss';

const Cell = forwardRef(({ size, color, className, id }, cellRef) => {
  const cellStyle = {
    width: size,
    height: size,
    backgroundColor: color,
    transform: 'initial'
  };

  const cellClass = classNames({
    cell: true,
    [className]: true
  });

  return (
    <div id={id} className={cellClass} style={cellStyle} ref={cellRef} />
  );
});

Cell.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

Cell.defaultProps = {
  size: 50,
  color: DEFAULT_COLOR,
  className: '',
  id: '',
};

export default Cell;
