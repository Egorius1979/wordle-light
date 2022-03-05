import React, { useEffect, useState } from 'react';

interface CellProps {
  row: number;
  currentRow: number;
  word: string;
  check: boolean;
  index: number;
  cb: (inPlace: boolean) => void;
}

export const Cell: React.FC<CellProps> = ({
  row,
  currentRow,
  word,
  check,
  index,
  cb,
}) => {
  const [value, setValue] = useState<string>('');
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    if (check && row === currentRow) {
      setBgColor(
        word[index] === value
          ? 'green'
          : word.includes(value)
          ? 'yellow'
          : 'grey'
      );
      // if (!index) {
      cb(word[index] === value);
      // }
    }
  }, [check, row]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2) {
      setValue(() => e.target.value);
    }
  };

  return (
    <input
      type="text"
      className={`cell ${bgColor}`}
      disabled={row !== currentRow}
      value={value}
      onChange={(e) => changeValue(e)}
    />
  );
};
