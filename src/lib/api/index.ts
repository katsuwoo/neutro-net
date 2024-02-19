import axios from 'axios';
import { CreateCommentRequestType, CreateCommentResponseType, ListCommentsRequestType, ListCommentsResponseType } from '../schema/comment';
import { ListThreadsRequestType, ListThreadsResponseType, CreateThreadRequestType, CreateThreadResponseType } from '../schema/thread';
import { CreateLikeRequestType, CreateLikeResponseType, DeleteLikeRequestType, DeleteLikeResponseType } from '../schema/like';
import { CreateBookmarkRequestType, DeleteBookmarkRequestType } from '../schema/bookmark';
import { ListNotificationsRequestType, ListNotificationsResponseType } from '../schema/notification';
import { PatchMeRequestType } from '../schema/user';

export async function patchMe(data: PatchMeRequestType): Promise<boolean> {
  const res = await axios.patch(
    "/api/users/me", data
  )
  if (res.status !== 200) {
    return false
  } else {
    return true
  }
}

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

export async function listThreads(data: ListThreadsRequestType): Promise<ListThreadsResponseType | null> {
  const res = await axios.get(
    "/api/threads", { params: data }
  )
  if (res.status !== 200) {
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

export async function listComments(data: ListCommentsRequestType): Promise<ListCommentsResponseType | null> {
  const res = await axios.get(
    "/api/comments", { params: data }
  )
  if (res.status !== 200) {
    return null
  } else {
    return res.data
  }
}

export async function listNotifications(data: ListNotificationsRequestType): Promise<ListNotificationsResponseType | null> {
  const res = await axios.get(
    "/api/notifications", { params: data }
  )
  if (res.status !== 200) {
    return null
  } else {
    return res.data
  }
}