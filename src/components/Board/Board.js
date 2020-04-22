import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { gsap, TweenMax } from 'gsap';
import { Draggable, InertiaPlugin } from 'gsap/all';
import { v4 as uuidv4 } from 'uuid';
import palette from 'google-palette';

import { swapArrayElements } from 'helpers';

import Cell from './Cell';

import './Board.scss';

gsap.registerPlugin(Draggable, InertiaPlugin);

const Board = ({ row, col, width }) => {
  const boardRef = useRef(null);
  const lastCellRef = useRef(null);
  const [cells, setCells] = useState([]);
  const [cellSize, setCellSize] = useState(0);
  const [renderId, setRenderId] = useState(null);

  const boardStyle = {
    width
  };

  useLayoutEffect(() => {
    if (!boardRef || !boardRef.current) return;
    if (!lastCellRef || !lastCellRef.current) return;

    TweenMax.set('.cell', {
      transform: 'translateX(0) translateY(0)',
      zIndex: 'initial'
    });

    let cellSwaps = [...cells];
    let swapping;
    let cellTarget;
    let isDragging = false;
    const throwing = [];

    function processMovement() {
      const { endX: x, endY: y, target } = this;
      const swapX = Math.round(x / cellSize);
      const swapY = Math.round(y / cellSize);

      const restore = () => {
        if (swapping) {
          const cellRestore = cellSwaps[swapping];
          TweenMax.to(`#cell-${cellRestore.index}`, .2, {
            transform: 'translateX(0) translateY(0)',
            zIndex: 999,
            onComplete: () => {
              TweenMax.set(`#cell-${cellRestore.index}`, {
                zIndex: 'initial'
              });
            }
          });
        }

        swapping = null;
      };

      if ((swapX === 0) && (swapY === 0)) {
        restore();
        return;
      }

      const cellIndex = parseInt(target.id.split('-')[1], 10);
      cellTarget = cells.findIndex((c) => c.index === cellIndex);

      const cellSwapTarget = cellTarget + swapX + swapY * row;
      const cellSwap = cellSwaps[cellSwapTarget];

      if (!cellSwap) return;

      const cellSwapIndex = cellSwap.index;

      if (cellIndex === cellSwapIndex) return;
      if (swapping === cellSwapTarget) return;

      restore();

      swapping = cellSwapTarget;

      TweenMax.to(`#cell-${cellSwap.index}`, .2, {
        transform: `translateX(${-swapX * cellSize}px) translateY(${-swapY * cellSize}px)`,
        zIndex: 999,
        onComplete: () => {
          TweenMax.set(`#cell-${cellSwap.index}`, {
            zIndex: 'initial'
          });
        }
      });
    }

    /* eslint-disable react/no-this-in-sfc */
    Draggable.create('.cell', {
      type: 'x,y',
      edgeResistance: 0.8,
      bounds: '.board',
      inertia: true,
      snap: {
        x: (endValue) => (Math.round(endValue / cellSize) * cellSize),
        y: (endValue) => (Math.round(endValue / cellSize) * cellSize)
      },
      onDragStart: function init() {
        isDragging = true;

        TweenMax.set(this.target, {
          zIndex: 9999
        });

        throwing.push(this.target.id);
      },
      onDrag: function checkDragSwap() {
        isDragging = true;
        processMovement.call(this);
      },
      onRelease: function checkThrowSwap() {
        processMovement.call(this);
        cellSwaps = swapArrayElements(cellSwaps, cellTarget, swapping);
        swapping = null;
        cellTarget = null;
        isDragging = false;
      },
      onThrowComplete: function conclude() {
        const i = throwing.findIndex((t) => t === this.target.id);
        throwing.splice(i, 1);

        if (isDragging || throwing.length) return;

        setCells(cellSwaps);
      }
    });
    /* eslint-enable */
  }, [boardRef, lastCellRef, cells, cellSize, row]);

  useEffect(() => {
    if (!row || !col) return;

    const scheme = ['tol-dv', 'tol-rainbow', 'tol-sq', 'mpn65'];
    const i = Math.floor(Math.random() * (scheme.length - 1));
    const colors = palette(scheme[i], row * col);

    const c = [];
    let k = 0;

    for (let i = 0; i < row; i += 1) {
      for (let j = 0; j < col; j += 1) {
        c.push({
          index: k,
          color: `#${colors[k]}`
        });
        k += 1;
      }
    }

    setCells(c);
  }, [row, col, width]);

  useEffect(() => {
    const s = Math.floor(width / row);
    setCellSize(s);
  }, [width, row]);

  useEffect(() => {
    setRenderId(uuidv4());
  }, [cells]);

  return (
    <div className="board" style={boardStyle} ref={boardRef}>
      { cells.map((cell, i) => (
        <Cell size={cellSize} id={`cell-${cell.index}`} color={cell.color} key={cell.index} ref={((i === cells.length - 1) ? lastCellRef : null)} render={renderId} />
      )) }
    </div>
  );
};

Board.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Board.defaultProps = {
  row: 8,
  col: 8,
  width: 400
};

export default Board;
