import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, OnInit, signal} from '@angular/core';
import {CommentPost, Post} from '../../../data/interfaces/post.interface';
import {UserAvatarComponent} from '../../../common-ui/user-avatar/user-avatar.component';
import {DatePipe} from '@angular/common';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'tt-post',
  standalone: true,
  imports: [
    UserAvatarComponent,
    DatePipe,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  post = input<Post>()

  comment = signal<CommentPost[]>([])

  #postService = inject(PostService)

  ngOnInit() {

    this.comment.set(this.post()!.comments)
  }

  async onCreated() {
    const comments = await firstValueFrom(this.#postService.getCommentsByPostId(this.post()!.id))
    this.comment.set(comments)
  }
}
