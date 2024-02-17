'use client';

import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidFaHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { createLike, deleteLike } from '@/lib/api';

type Props = {
  commentId: number;
  likes: number;
  isLiked: boolean;
}

// React.useOptimistic is expremental and doesn't work as expected so I created my own custom hook
const useOriginalOptimistic = (initialState: { likes: number, isLiked: boolean }) => {
  const [state, setState] = React.useState(initialState);

  const updateCount = async (commentId: number) => {
    setState((prevState) => {
      return {
        likes: prevState.likes + (prevState.isLiked ? -1 : 1),
        isLiked: !prevState.isLiked,
      }
    });
    // async function that updates the count but when an error occurs, 
    // it should revert the state 
    if (state.isLiked) {
      deleteLike({ commentId }).then((res) => {
        if (res !== null) {
          setState({
            likes: res.likes,
            isLiked: false,
          })
        } else {
          setState(state)
        }
      }).catch((error) => {
        console.log(error)
        setState(state)
      });
    } else {
      createLike({ commentId }).then((res) => {
        console.log(res)
        if (res !== null) {
          setState({
            likes: res.likes,
            isLiked: true,
          })
        } else {
          setState(state)
        }
      }).catch((error) => {      
        console.log(error)
        setState(state)
      });
    }
  };

  return { state, updateCount };
}

const LikeIcon: React.FC<Props> = ({commentId, likes, isLiked}) => {
  const { state, updateCount } = useOriginalOptimistic({ likes, isLiked });

  return (
    <div className='flex gap-1 hover:cursor-pointer items-center' onClick={async (e) => {
      e.stopPropagation();
      e.preventDefault();
      await updateCount(commentId);
    }}>
      <FontAwesomeIcon icon={state.isLiked ? solidFaHeart : faHeart} 
        className={`h-4 ${state.isLiked ? 'text-red-500' : ''}`} />
      <p>{state.likes}</p>
    </div>
  )
}

export default LikeIcon;