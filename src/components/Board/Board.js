import React from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

import './Board.scss';

const Board = ({ rows, cols, width }) => {
  const boardStyle = {
    width
  };

  return (
    <div className="board" style={boardStyle}>
      { Array(rows * cols).fill(0).map(() => (
        <Cell size={Math.floor(width / rows)} />
      )) }
    </div>
  );
};

Board.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Board.defaultProps = {
  rows: 8,
  cols: 8,
  width: 400
}

export default Board;
