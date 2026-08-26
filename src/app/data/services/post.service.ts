import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CommentPost, CommentCreateDto, Post, PostCreateDto} from '../interfaces/post.interface';
import {map, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  #http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([])

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${this.baseApiUrl}post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPost()
        })
    )
  }

  fetchPost(userId?: number) {
    let params = new HttpParams()

    if (userId) {
      params = params.set('user_id', userId)
    }

    return this.#http.get<Post[]>(`${this.baseApiUrl}post/`, {params})
      .pipe(
        tap(res => this.posts.set(res))
      );
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<CommentPost>(`${this.baseApiUrl}comment/`, payload)
  }

  getCommentsByPostId(postId: number) {
    return this.#http.get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(
        map(res => res.comments)
      )
  }

  createLike(postId: number) {
    return this.#http.post<string>(`${this.baseApiUrl}post/like/${postId}`, {})
  }
}
