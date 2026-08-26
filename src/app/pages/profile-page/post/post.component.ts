import {
  ChangeDetectionStrategy,
  Component, computed, effect,
  inject,
  input,
  OnInit,
  output,
  signal
} from '@angular/core';
import {CommentPost, Post} from '../../../data/interfaces/post.interface';
import {UserAvatarComponent} from '../../../common-ui/user-avatar/user-avatar.component';
import {SvgIconComponent} from '../../../common-ui/svg-icon/svg-icon.component';
import {PostInputComponent} from '../post-input/post-input.component';
import {CommentComponent} from './comment/comment.component';
import {PostService} from '../../../data/services/post.service';
import {firstValueFrom} from 'rxjs';
import {CurrentDatePipe} from '../../../helpers/pipes/current-date.pipe';
import {ProfileService} from '../../../data/services/profile.service';

@Component({
  selector: 'tt-post',
  standalone: true,
  imports: [
    UserAvatarComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    CurrentDatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  #postService = inject(PostService);
  #me = inject(ProfileService).me;

  post = input<Post>();
  isCommentInput = input<boolean>(false);
  createComment = output<string>();

  #localLikedDelta = signal<number>(0);
  #userToggled = signal<boolean | null>(null);

  like = computed(() => {
    const baseLikes = this.post()?.likes ?? 0;
    return baseLikes + this.#localLikedDelta();
  });

  isLiked = computed(() => {
    if (this.#userToggled() !== null) {
      return this.#userToggled()!;
    }

    const myId = this.#me()?.id;
    const likesUsers = this.post()?.likesUsers;

    if (!myId || !likesUsers) return false;

    return likesUsers.some(id => String(id) === String(myId));
  });

  comment = signal<CommentPost[]>([]);

  constructor() {
    effect(() => {
      const currentComments = this.post()?.comments ?? [];
      this.comment.set(currentComments);
    }, { allowSignalWrites: true });
  }

  async onLike(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const postId = this.post()?.id;
    if (!postId) return;

    const currentlyLiked = this.isLiked();

    this.#userToggled.set(!currentlyLiked);
    this.#localLikedDelta.update(d => currentlyLiked ? d - 1 : d + 1);

    try {
      await firstValueFrom(this.#postService.createLike(postId));
    } catch (error) {
      this.#userToggled.set(currentlyLiked);
      this.#localLikedDelta.update(d => currentlyLiked ? d + 1 : d - 1);
    }
  }

  async onCreated(text: string) {
    if (!text?.trim()) return;

    this.createComment.emit(text);
    const postId = this.post()?.id;
    if (!postId) return;

    const comments = await firstValueFrom(
      this.#postService.getCommentsByPostId(postId)
    );
    this.comment.set(comments);
  }
}
