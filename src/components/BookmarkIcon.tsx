'use client';

import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidFaBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { createBookmark, deleteBookmark } from '@/lib/api';

type Props = {
  commentId: number;
  initialBookmarked: boolean;
}

// React.useOptimistic is expremental and doesn't work as expected so I created my own custom hook
const useOriginalOptimistic = (initialBookmarked: boolean ) => {
  const [isBookmarked, setIsBookmarked] = React.useState(initialBookmarked);

  const updateBookmark = async (id: number) => {
    setIsBookmarked((prev) => {
      return !prev
    });
    // async function that updates the bookmark but when an error occurs,
    // it should revert the bookmark
    if (isBookmarked) {
      deleteBookmark({ commentId: id }).then((res) => {
        if (res) {
          setIsBookmarked(false)
        } else {
          setIsBookmarked(true)
        }
      }).catch((error) => {
        console.log(error)
        setIsBookmarked(true)
      });
    } else {
      createBookmark({ commentId: id }).then((res) => {
        console.log(res)
        if (res) {
          setIsBookmarked(true)
        } else {
          setIsBookmarked(false)
        }
      }).catch((error) => {
        console.log(error)
        setIsBookmarked(false)
      });
    }
  };

  return { isBookmarked, updateBookmark };
}

const BookmarkIcon: React.FC<Props> = ({commentId, initialBookmarked}) => {
  const { isBookmarked, updateBookmark } = useOriginalOptimistic(initialBookmarked);

  return (
    <div className='flex gap-1 hover:cursor-pointer items-center' onClick={async (e) => {
      e.stopPropagation();
      e.preventDefault();

      await updateBookmark(commentId);
    }}>
      <FontAwesomeIcon icon={isBookmarked ? solidFaBookmark : faBookmark} 
        className={`px-2 h-4 ${isBookmarked ? 'text-main-blue' : ''}`} />
    </div>
  )
}

export default BookmarkIcon;