"use client";

import { GENRES } from '@/constants';
import { Genre } from '@prisma/client';
import React from 'react';

type GenreDropdownProps = {
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
}

// Can order later if needed
const GENRE_LIST: Genre[] = [
  {
    id: -1,
    name: 'すべて',
  },
  ...GENRES
];

const GenreForSearchDropdown: React.FC<GenreDropdownProps> = ({ selected, setSelected }) => {
  return (
    <div className="relative flex items-center pl-3 py-2 border-b-2">
      <label className='min-w-20'>ジャンル:</label>
      <select
        value={selected !== undefined ? selected : -1}
        className="
          block bg-white border-[1px]  rounded-xl
          p-1 pr-4 focus:outline-none 
        "
        onChange={(e) => {
          const selectedValue = parseInt(e.target.value);
          if (selectedValue >= 0) {
            setSelected(selectedValue);
          } else {
            setSelected(undefined);
          }
        }}
      >
        {GENRE_LIST.map((genre, index) => (
          <option key={`genre_${index}`} value={
            genre.id
          }>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreForSearchDropdown;