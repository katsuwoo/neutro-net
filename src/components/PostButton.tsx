'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const PostButton: React.FC<{handleClick: React.MouseEventHandler<HTMLButtonElement>}> = ({handleClick}) => {
  return (
    <button onClick={handleClick} className="fixed right-4 bottom-4 bg-sub-blue text-white p-3 rounded-full focus:outline-none">
      <FontAwesomeIcon icon={faPencilAlt} className='h-7' />
    </button>
  );
};

export default PostButton;