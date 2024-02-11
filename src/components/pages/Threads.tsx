"use client";

import React from 'react';
import PostButton from '../PostButton';
import Comment, {CommentType} from '../Comment';
import CreatePost from '../CreatePost';

// Assuming you have a Post type
type Post = {
  id: number;
  title: string;
  content: string;
};

type ThreadsProps = {
  posts: Post[];
};

const ThreadsPageComponent: React.FC<ThreadsProps> = ({ posts }) => {
  const [isShown, setIsShown] = React.useState(false);
  return (
    <div className='relative'>
      <ThreadList 
      comments={[
        {
            id: 1,
            thread: {
              genre: '趣味・スポーツ',
              title: '普段皆さん何していますか？',
            },
            threadId: 1,
            author: 'Aiud1649',
            comments: 0,
            content: '最近時間ができたのでスポーツなど\nしようと思っています。',
            date: '2023-01-01',
            favs: 0,
        },
        {
            id: 1,
            thread: {
              genre: '趣味・スポーツ',
              title: '普段皆さん何していますか？',
            },
            threadId: 1,
            author: 'Aiud1649',
            comments: 0,
            content: '最近時間ができたのでスポーツなど\nしようと思っています。',
            date: '2023-01-01',
            favs: 0,
        },
        {
            id: 1,
            thread: {
              genre: '趣味・スポーツ',
              title: '普段皆さん何していますか？',
            },
            threadId: 1,
            author: 'Aiud1649',
            comments: 0,
            content: '最近時間ができたのでスポーツなど\nしようと思っています。',
            date: '2023-01-01',
            favs: 0,
        },
        {
            id: 1,
            thread: {
              genre: '趣味・スポーツ',
              title: '普段皆さん何していますか？',
            },
            threadId: 1,
            author: 'Aiud1649',
            comments: 0,
            content: '最近時間ができたのでスポーツなど\nしようと思っています。',
            date: '2023-01-01',
            favs: 0,
        },
        {
            id: 1,
            thread: {
              genre: '趣味・スポーツ',
              title: '普段皆さん何していますか？',
            },
            threadId: 1,
            author: 'Aiud1649',
            comments: 0,
            content: '最近時間ができたのでスポーツなど\nしようと思っています。',
            date: '2023-01-01',
            favs: 0,
        }
      ]} />
      <PostButton handleClick={() => {
        setIsShown(true);
      }}/>
      <CreatePost isShown={isShown} setIsShown={setIsShown} />
    </div>
  );
};

export default ThreadsPageComponent;

const ThreadList: React.FC<{comments: CommentType[]}> = ({comments}) => {
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