'use client';

import React,{ useEffect, useRef, useState }  from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Comment from './Comment';
import { CommentType } from '@/lib/schema/comment';
import { useInView } from '@/lib/hooks';
import { listThreads } from '@/lib/api';
import { THREADS_LIMIT } from '@/constants';
import GenreForSearchDropdown from './GenreForSearchDropdown';
import LoadingCircle from './LoadingCircle';

const ThreadList: React.FC<{comments: CommentType[], genre: number | undefined}> = (props) => {
  const [genre, setGenre] = useState<number | undefined>(props.genre);
  const [comments, setComments] = useState<CommentType[]>(props.comments);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allFetched, setAllFetched] = useState(props.comments.length < THREADS_LIMIT);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const pathname = usePathname()
  const paramGenre = useSearchParams().get("genre");
  const router = useRouter()

  useEffect(() => {
    setComments(props.comments);
    setAllFetched(props.comments.length < THREADS_LIMIT);
    setIsLoading(false);
  }, [props.comments]);

  useEffect(() => {
    const paramgenre = paramGenre !== null ? parseInt(paramGenre) : undefined;
    // the paramgenre and the genre are same when the page is opened.
    // Otherwise, they are different when the dropdown is changed.
    if (paramgenre !== genre) {
      router.push(genre !== undefined ? `${pathname}?genre=${genre}` : pathname, {scroll: false});
      setIsLoading(true);
      setComments([]);
      setAllFetched(true);
    }
  }, [genre]);

  useEffect(() => {
    if (inView && allFetched === false) {
      setIsFetching(true);
      setIsLoading(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isFetching && allFetched === false) {
      const prevId = comments.length > 0 ? comments[comments.length - 1].id : undefined;
      console.log(genre)
      listThreads({
        prevId: prevId,
        genre: genre,
      }).then((res) => {
        console.log(res)
        if (res !== null) {
          setComments((prev) => {
            return [
              ...prev,
              ...res
            ]
          });
          if (res.length < THREADS_LIMIT) {
            setAllFetched(true);
          } else {
            setAllFetched(false);
          }
        } else {
          // TODO: Show error message
          setAllFetched(true);
        }
      });
    }
    setIsFetching(false);
  }, [isFetching]);
  
  return (
    <div>
      <GenreForSearchDropdown selected={genre} setSelected={setGenre} />
      <ul>
          {comments.map((comment) => (
            <li key={comment.id} className='border-b-2 p-2'>
              <Comment
                key={comment.id}
                {...comment} />
            </li>
          ))}
          {isLoading && <LoadingCircle />}
      </ul>
      <div ref={ref} />
    </div>
  );
};

export default ThreadList;