import { useEffect, useState } from 'react';
import { Cell } from './Cell';

interface RowProps {
  cells: number[];
  row: number;
  current: number;
  word: string;
  check: boolean;
  mainCall: (count: number) => void;
}

export const Row: React.FC<RowProps> = ({
  cells,
  row,
  current,
  word,
  check,
  mainCall,
}) => {
  let counter: number = 0;

  const rowCallback = (inPlace: boolean, index: number) => {
    counter = inPlace ? counter + 1 : counter;
    if (index === 4) {
      mainCall(counter);
    }
  };

  return (
    <>
      {cells.map((cell) => (
        <Cell
          key={cell}
          row={row}
          currentRow={current}
          word={word}
          check={check}
          index={cell}
          cb={rowCallback}
        />
      ))}
    </>
  );
};
