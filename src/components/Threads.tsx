import React from 'react';
import Comment, {CommentType} from './Comment';

const Threads: React.FC<{comments: CommentType[]}> = ({comments}) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id} className='border-b-2 p-2'>
          <Comment
            key={comment.id}
            {...comment} />
        </li>
      ))}
    </ul>
  );
};

export default Threads;