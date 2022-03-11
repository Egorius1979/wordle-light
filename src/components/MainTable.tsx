import React, { useEffect, useState, useRef } from 'react';
import { Row } from './Row';
import { dictionary } from '../consts';

export const MainTable: React.FC = () => {
  const [word, setWord] = useState<string>(
    dictionary[Math.floor(Math.random() * dictionary.length)]
  );
  const [currentRow, setCurrentRow] = useState<number>(1);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  const rows: number[] = new Array(6).fill(null).map((_, idx) => idx + 1);
  console.log(word);

  const clickHandler = () => {
    if (currentRow <= 6) {
      setIsChecking(true);
    }
  };

  const newGame = () => {
    window.location.reload();
  };

  const mainCallback = (count: number) => {
    if (count === 5) {
      setResult('Верно, поздравляю!');
      return;
    }
    if (currentRow < 6) {
      setIsChecking(false);
      setCurrentRow((prev) => prev + 1);
      return;
    }
    setResult('Увы, попробуйте ещё раз!');
  };

  return (
    <div className="field" onMouseDown={(e) => e.preventDefault()}>
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
        {!result && (
          <button className="btn check" onClick={clickHandler}>
            ПРОВЕРИТЬ
          </button>
        )}
        {result && (
          <button className="btn new-game" onClick={newGame}>
            ИГРАТЬ
          </button>
        )}
        <p>{result}</p>
      </div>
    </div>
  );
};
