import axios from 'axios';
import { CreateCommentRequestType, CreateCommentResponseType } from '../schema/comment';
import { CreateThreadRequestType, CreateThreadResponseType } from '../schema/thread';
import { CreateLikeRequestType, CreateLikeResponseType, DeleteLikeRequestType, DeleteLikeResponseType } from '../schema/like';
import { CreateBookmarkRequestType, DeleteBookmarkRequestType } from '../schema/bookmark';

export async function createComment(data: CreateCommentRequestType): Promise<CreateCommentResponseType | null> {
  const res = await axios.post(
    "/api/comments", data
  )
  if (res.status !== 201) {
    return null
  } else {
    return res.data
  }
}

export async function createThread(data: CreateThreadRequestType): Promise<CreateThreadResponseType | null> {
  const res = await axios.post(
    "/api/threads", data
  )
  if (res.status !== 201) {
    return null
  } else {
    return res.data
  }
}

export async function createLike(data: CreateLikeRequestType): Promise<CreateLikeResponseType | null> {
  const res = await axios.post(
    "/api/likes", data
  )
  if (res.status !== 201) {
    return null
  } else {
    return res.data
  }
}

export async function deleteLike(data: DeleteLikeRequestType): Promise<DeleteLikeResponseType | null> {
  const res = await axios.delete(
    "/api/likes", { data }
  )
  if (res.status !== 200) {
    return null
  } else {
    return res.data
  }
}

export async function createBookmark(data: CreateBookmarkRequestType): Promise<boolean> {
  const res = await axios.post(
    "/api/bookmarks", data
  )
  if (res.status !== 201) {
    return false
  } else {
    return true
  }
}

export async function deleteBookmark(data: DeleteBookmarkRequestType): Promise<boolean> {
  const res = await axios.delete(
    "/api/bookmarks", { data }
  )
  if (res.status !== 200) {
    return false
  } else {
    return true
  }
}