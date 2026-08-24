import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { debounceTime, firstValueFrom, fromEvent, timer } from 'rxjs';

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

  feed = this.#postService.posts;

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    firstValueFrom(this.#postService.fetchPost());
  }

  ngAfterViewInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000))
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
}
