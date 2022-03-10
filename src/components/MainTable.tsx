import React, { useState } from 'react';
import { Row } from './Row';

const word = 'кадет';

export const MainTable: React.FC = () => {
  const [currentRow, setCurrentRow] = useState<number>(1);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const rows: number[] = new Array(6).fill(null).map((_, idx) => idx + 1);

  console.log('main done');

  const clickHandler = () => {
    if (currentRow <= 6) {
      setIsChecking(true);
    }
  };

  const mainCallback = (count: number) => {
    if (count === 5) {
      setResult('Всё верно, поздравляем!');
      return;
    }
    if (currentRow < 6) {
      setIsChecking(false);
      setCurrentRow((prev) => prev + 1);
      return;
    }
    setResult('Увы, неверно, попробуйте снова!');
  };
  console.log(currentRow, isChecking);

  return (
    <div className="field">
      {rows.map((row) => (
        <Row
          key={row}
          row={row}
          current={currentRow}
          word={word}
          check={isChecking}
          mainCall={mainCallback}
        />
      ))}
      <div className="flex">
        <button className="check" onClick={clickHandler}>
          ПРОВЕРИТЬ
        </button>
        <p>{result}</p>
      </div>
    </div>
  );
};
