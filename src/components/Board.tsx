import React from 'react';
import Threads from './Threads';
import PostButton from './PostButton';

// Assuming you have a Post type
type Post = {
  id: number;
  title: string;
  content: string;
};

type BoardProps = {
  posts: Post[];
};

const Board: React.FC<BoardProps> = ({ posts }) => {
  return (
    <div className='relative'>
      <Threads 
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
      <PostButton />
    </div>
  );
};

export default Board;