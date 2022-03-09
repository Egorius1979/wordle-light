import React, { useEffect, useState } from 'react';

interface CellProps {
  row: number;
  currentRow: number;
  word: string;
  check: boolean;
  index: number;
  cb: (inPlace: boolean, index: number) => void;
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
      cb(word[index] === value, index);
    }
  }, [check, row]);

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
    />
  );
};
