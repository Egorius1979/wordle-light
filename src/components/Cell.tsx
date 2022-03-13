import React, { useEffect, useRef, useState } from 'react';

interface CellProps {
  row: number;
  currentRow: number;
  word: string;
  check: boolean;
  index: number;
  cellInFocus: number;
  rowCb: (inPlace: boolean, index: number) => void;
  rowCb1: (value: boolean) => void;
  deleted: boolean;
}

export const Cell: React.FC<CellProps> = ({
  row,
  currentRow,
  word,
  check,
  index,
  cellInFocus,
  rowCb,
  rowCb1,
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
          : word.includes(value) && value
          ? 'yellow'
          : !value
          ? 'red'
          : 'grey'
      );
      rowCb(word[index] === value, index);
    }
  }, [check, row, currentRow, word, index, value, rowCb]);

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
      rowCb1(true);
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
      } else rowCb1(false);
    }
  };

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
