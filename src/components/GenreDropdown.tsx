"use client";

import { GENRES } from '@/constants';
import { Genre } from '@prisma/client';
import React from 'react';
import { ErrP } from './NoteDiv';

interface GenreDropdownProps {
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>
}

// Can order later if needed
const GENRE_LIST: Genre[] = [
  {
    id: -1,
    name: '選択してください',
  },
  ...GENRES
];

const GenreDropdown: React.FC<GenreDropdownProps> = ({ selected, setSelected, error, setError }) => {
  return (
    <div className="relative">
      <select
        value={selected !== null ? selected : -1}
        className="
          block appearance-none w-full bg-white border-2 border-gray-300 hover:border-gray-500 
          px-4 py-2 pr-8 rounded-lg focus:outline-none focus:shadow-outline 
        "
        onChange={(e) => {
          const selectedValue = parseInt(e.target.value);
          if (selectedValue >= 0) {
            setSelected(selectedValue);
            setError("")
          }
        }}
      >
        {GENRE_LIST.map((genre, index) => (
          <option key={`genre_${index}`} value={
            genre.id
          } hidden={genre.id === -1}>
            {genre.name}
          </option>
        ))}
      </select>
      <ErrP errMessage={error} />
    </div>
  );
}

export default GenreDropdown;