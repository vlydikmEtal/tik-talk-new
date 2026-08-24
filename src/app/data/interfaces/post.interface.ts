import { Profile } from './profile.interface';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
}

export interface CommentCreateDto {
  text: string
  authorId: number
  postId: number
}

export interface Post {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  likesUsers: string[];
  comments: CommentPost[];
}

export interface CommentPost {
  id: number;
  text: string;
  author: Profile;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}
