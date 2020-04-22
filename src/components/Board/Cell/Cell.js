import React, { forwardRef, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TweenMax } from 'gsap';

import { DEFAULT_COLOR } from 'consts';

import './Cell.scss';
import { Tween } from 'gsap/gsap-core';

const Cell = forwardRef(({ size, color, className, id, render }, cellRef) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

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
  render: PropTypes.string
};

Cell.defaultProps = {
  size: 50,
  color: DEFAULT_COLOR,
  className: '',
  id: '',
  render: null
};

export default Cell;
