import React, { useEffect, useRef, useState } from 'react';

interface CellProps {
  row: number;
  currentRow: number;
  word: string;
  check: boolean;
  index: number;
  cellInFocus: number;
  cb: (inPlace: boolean, index: number) => void;
  cb1: () => void;
}

export const Cell: React.FC<CellProps> = ({
  row,
  currentRow,
  word,
  check,
  index,
  cellInFocus,
  cb,
  cb1,
}) => {
  const [value, setValue] = useState<string>('');
  const [bgColor, setBgColor] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (check && row === currentRow) {
      setBgColor(
        word[index] === value
          ? 'green'
          : word.includes(value)
          ? 'yellow'
          : 'grey'
      );
      cb(word[index] === value, index);
    }
  }, [check, row, currentRow, word, index]);

  useEffect(() => {
    if (value) {
      cb1();
    }
  }, [value]);

  useEffect(() => {
    if (cellInFocus === index || check) {
      return inputRef?.current?.focus();
    }
  }, [cellInFocus, index, check]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) {
      setValue(() => e.target.value);
    }
  };

  console.log('cell done');

  return (
    <input
      type="text"
      className={`cell ${bgColor}`}
      disabled={row !== currentRow}
      value={value}
      onChange={(e) => changeValue(e)}
      ref={inputRef}
    />
  );
};
