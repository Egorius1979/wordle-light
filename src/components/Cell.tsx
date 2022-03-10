import React, { useEffect, useRef, useState } from 'react';

interface CellProps {
  row: number;
  currentRow: number;
  word: string;
  check: boolean;
  index: number;
  cellInFocus: number;
  cb: (inPlace: boolean, index: number) => void;
  cb1: (value: boolean) => void;
  deleted: boolean;
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
  deleted,
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
  }, [check, row, currentRow, word, index, value]);

  useEffect(() => {
    if (deleted && cellInFocus === index) {
      setValue('');
    }
    if (cellInFocus === index || check) {
      return inputRef?.current?.focus();
    }
  }, [cellInFocus, index, check, deleted]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) {
      setValue(() => e.target.value);
      cb1(true);
    }
  };

  const deleteLetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      if (index === 4 && value) {
        setValue('');
      } else cb1(false);
    }
  };

  console.log('cell done');

  return (
    <input
      type="text"
      className={`cell ${bgColor} ${value ? 'border' : ''}`}
      disabled={row !== currentRow}
      value={value}
      onChange={(e) => changeValue(e)}
      ref={inputRef}
      onKeyDown={deleteLetter}
    />
  );
};
