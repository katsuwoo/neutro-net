"use client";

import { BUSINESS_TYPES } from '@/constants';
import { patchMe } from '@/lib/api';
import { BusinessType } from '@prisma/client';
import React from 'react';

interface GenreDropdownProps {
  initialSelected: number | null;
}

// Can order later if needed
const BusinessTypeList: BusinessType[] = [
  {
    id: -1,
    name: '',
  },
  ...BUSINESS_TYPES
];

const BusinessTypeDropdown: React.FC<GenreDropdownProps> = ({ initialSelected }) => {
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
            patchMe({ businessTypeId: selectedValue }).then((isSuccess) => {
              if (!isSuccess) {
                setSelected(selected);
              }
            });
          }
        }}
      >
        {BusinessTypeList.map((businessType, index) => (
          <option key={`genre_${index}`} value={
            businessType.id
          } hidden={businessType.id === -1}>
            {businessType.name}
          </option>
        ))}
      </select>
      <button
        className="
          bg-sub-blue hover:bg-main-blue text-white rounded-lg py-1 px-2
        "
        onClick={() => {
          setSelected(null);
          patchMe({ businessTypeId: null }).then((isSuccess) => {
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

export default BusinessTypeDropdown;