"use client";

import { JOB_CATEGORIES } from '@/constants';
import { patchMe } from '@/lib/api';
import { JobCategory } from '@prisma/client';
import React from 'react';

interface GenreDropdownProps {
  initialSelected: number | null;
}

// Can order later if needed
const JobCategoryList: JobCategory[] = [
  {
    id: -1,
    name: '',
  },
  ...JOB_CATEGORIES
];

const JobCategoryDropdown: React.FC<GenreDropdownProps> = ({ initialSelected }) => {
  const [selected, setSelected] = React.useState<number | null>(initialSelected);
  return (
    <div className='flex gap-2'>
      <select
        value={selected !== null ? selected : -1}
        className="
          border-2 border-gray-300 rounded-lg py-1 px-2 w-[270px]
        "
        onChange={(e) => {
          const selectedValue = parseInt(e.target.value);
          if (selectedValue >= 0) {
            setSelected(selectedValue);
            patchMe({ jobCategoryId: selectedValue }).then((isSuccess) => {
              if (!isSuccess) {
                setSelected(selected);
              }
            });
          }
        }}
      >
        {JobCategoryList.map((jobCategory, index) => (
          <option key={`genre_${index}`} value={
            jobCategory.id
          } hidden={jobCategory.id === -1}>
            {jobCategory.name}
          </option>
        ))}
      </select>
      <button
        className="
        bg-sub-blue hover:bg-main-blue text-white rounded-lg py-1 px-2
        "
        onClick={() => {
          setSelected(null);
          patchMe({ jobCategoryId: null }).then((isSuccess) => {
            if (!isSuccess) {
              setSelected(selected);
            }
          });
        }}
      >
        クリア
      </button>
    </div>
  );
}

export default JobCategoryDropdown;