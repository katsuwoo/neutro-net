import { faBookmark, faComments, faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type IconsType = {
  commentId: number;
  favs: number;
  comments: number;
}

const Icons: React.FC<IconsType> = (props) => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-4'>
        <div className='flex gap-1 hover:cursor-pointer'>
          <FontAwesomeIcon icon={faHeart} className='h-4' />
          <p>{props.favs}</p>
        </div>
        <div className='flex gap-1'>
          <FontAwesomeIcon icon={faComments} className='h-4' />
          <p>{props.comments}</p>
        </div>
      </div>
      <div className='flex justify-end gap-2 hover:cursor-pointer'>
        <FontAwesomeIcon icon={faBookmark} className='h-5' />
      </div>
    </div>
  )
}

export default Icons;