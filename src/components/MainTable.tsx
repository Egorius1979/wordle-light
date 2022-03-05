import React, { useState } from 'react';
import { Row } from './Row';

const word = 'кадет';

export const MainTable: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<number>(1);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState(false);

  const rows = new Array(6).fill(null).map((_, idx) => idx + 1);
  const cells = new Array(5).fill(null).map((_, idx) => idx);

  const clickHandler = () => {
    setIsChecking(true);
  };

  const mainCallback = (count: number) => {
    if (count === 5) {
      setHasWon(true);
      return;
    }
    setIsChecking(false);
    setCurrentRow((prev) => prev + 1);
  };
  console.log(currentRow, isChecking);

  return (
    <div className="field flex">
      {rows.map((row) => (
        <Row
          key={row}
          cells={cells}
          row={row}
          current={currentRow}
          word={word}
          check={isChecking}
          mainCall={mainCallback}
        />
      ))}
      <button className="check" onClick={clickHandler}>
        ПРОВЕРИТЬ
      </button>
      {hasWon && <p>Вы отгадали</p>}
    </div>
  );
};
