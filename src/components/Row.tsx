import { useCallback, useEffect, useState } from 'react';
import { Cell } from './Cell';

interface RowProps {
  row: number;
  current: number;
  word: string;
  check: boolean;
  mainCall: (count: number) => void;
}

export const Row: React.FC<RowProps> = ({
  row,
  current,
  word,
  check,
  mainCall,
}) => {
  const [nextAutofocusCell, setNextAutofocusCell] = useState<number>(0);
  const [deleted, setDeleted] = useState<boolean>(false);
  const cells: number[] = new Array(5).fill(null).map((_, idx) => idx);
  let counter: number = 0;

  const rowCallback = (inPlace: boolean, index: number) => {
    counter = inPlace ? counter + 1 : counter;
    if (index === 4) {
      mainCall(counter);
    }
  };

  const rowCallback1 = (valueWasSet: boolean) => {
    if (!valueWasSet && nextAutofocusCell > 0) {
      setNextAutofocusCell((prev) => prev - 1);
      setDeleted(true);
      return;
    }
    if (valueWasSet && nextAutofocusCell < 4) {
      setNextAutofocusCell((prev) => prev + 1);
      if (deleted) {
        setDeleted(false);
      }
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
          cellInFocus={nextAutofocusCell}
          cb={rowCallback}
          cb1={rowCallback1}
          deleted={deleted}
        />
      ))}
    </>
  );
};
