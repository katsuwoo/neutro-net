"use client";

import React from 'react';

interface GenreDropdownProps {
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

const GenreDropdown: React.FC<GenreDropdownProps> = ({ selected, setSelected }) => {
  // Can order later if needed
  const genres = [
    {
      id: -1,
      name: '選択してください',
    },
    {
      id: 0,
      name: '趣味・スポーツ',
    },
    {
      id: 1,
      name: '恋愛・人間関係',
    },
    {
      id: 2,
      name: '学問・キャリア',
    },
    {
      id: 3,
      name: '健康・美容',
    },
    {
      id: 999,
      name: '雑談',
    }
  ];
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
          console.log(selectedValue)
          if (selectedValue >= 0)
            setSelected(selectedValue);
        }}
      >
        {genres.map((genre, index) => (
          <option key={`genre_${index}`} value={
            genre.id
          } hidden={genre.id === -1}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreDropdown;