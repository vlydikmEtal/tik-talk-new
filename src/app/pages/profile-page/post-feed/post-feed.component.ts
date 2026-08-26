import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, DestroyRef,
  ElementRef,
  HostListener,
  inject, input,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { debounceTime, firstValueFrom, fromEvent, timer } from 'rxjs';
import {ProfileService} from '../../../data/services/profile.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements AfterViewInit {
  #postService = inject(PostService);
  #hostElementRef = inject(ElementRef);
  #r2 = inject(Renderer2);
  #destroyRef = inject(DestroyRef)

  feed = this.#postService.posts;
  profile = inject(ProfileService).me;
  isCommentInput = input<boolean>(false)

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.resizeFeed());
  }

  resizeFeed() {
    const { top } = this.#hostElementRef.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 16;
    this.#r2.setStyle(
      this.#hostElementRef.nativeElement,
      'height',
      `${height}px`,
    );
  }

  async onPostCreated(text: string) {
    if (!text) return

    await firstValueFrom(
      this.#postService.createPost({
        title: 'Клевый пост',
        content: text,
        authorId: this.profile()!.id
      })
    )
  }

  async onCommentCreated(postId: number, text: string) {
    const currentProfile = this.profile();

    if (!text || !currentProfile) return;

    await firstValueFrom(
      this.#postService.createComment({
        text,
        authorId: currentProfile.id,
        postId
      })
    );
  }
}
