"use client";

import React from 'react';
import Layout from '@/components/Layout';
import Comment, { CommentType } from '@/components/Comment';
import PostButton from '@/components/PostButton';
import CreatePost from '@/components/CreatePost';

interface Thread {
  genre: string;
  title: string;
  content: string;
  author: string;
  date: string;
  favs: number;
  comments: number;
  commentList: CommentType[];
}

const ThreadPage: React.FC = () => {
  const [isShown, setIsShown] = React.useState(false);
  const thread: Thread = {
    genre: '趣味・スポーツ',
    title: '普段皆さん何していますか？',
    content: '最近時間ができたのでスポーツなど\nしようと思っています。',
    author: 'Ai432814',
    date: '2023-01-01',
    favs: 0,
    comments: 0,
    commentList: [
      {
        id: 1,
        threadId: 1,
        author: 'Aiud1649',
        date: '2023-01-01',
        content: '最近時間ができたのでスポーツなど\nしようと思っています。',
        favs: 0,
        comments: 0,
      },
      {
        id: 1,
        threadId: 1,
        author: 'Aiud1649',
        date: '2023-01-01',
        content: '最近時間ができたのでスポーツなど\nしようと思っています。',
        favs: 0,
        comments: 0,
      },
      {
        id: 1,
        threadId: 1,
        author: 'Aiud1649',
        date: '2023-01-01',
        content: '最近時間ができたのでスポーツなど\nしようと思っています。',
        favs: 0,
        comments: 0,
      },
    ],
  };
  const { genre, title, content, author, date, favs, comments, commentList } = thread;
  return (
    <Layout>
      <div className='p-2 border-b-2' id='title-section'>
        <div className='flex justify-between'>
          <p className='text-sm text-gray-500'>{"# " + genre}</p>
        </div>
        <h2 className='font-bold text-xl'>{title}</h2>
      </div>
      <div className='p-2'>
        <Comment
          id={1}
          threadId={1}
          author={author}
          date={date}
          content={content}
          favs={favs}
          comments={comments}
        />
      </div>
      <h3 className='p-4 border-y-4 text-xs'>コメント一覧</h3>
      <ul>
        {commentList.map((comment, index) => (
          <li key={`comment_${index}`} className='p-2 border-b-2'>
            <Comment {...comment} />
          </li>
        ))}
      </ul>
      <PostButton handleClick={() => {
        setIsShown(true);
      }}/>
      <CreatePost isShown={isShown} setIsShown={setIsShown} comment={{
        id: 1,
        content: '最近時間ができたのでスポーツなど\nしようと思っています。',
      }}/>
    </Layout>
  );
};

export default ThreadPage;
