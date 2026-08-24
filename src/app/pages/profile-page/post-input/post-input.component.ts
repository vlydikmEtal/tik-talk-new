import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, HostBinding,
  inject, input, output,
  Renderer2, signal,
} from '@angular/core';
import { UserAvatarComponent } from '../../../common-ui/user-avatar/user-avatar.component';
import { ProfileService } from '../../../data/services/profile.service';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostService } from '../../../data/services/post.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'tt-post-input',
  standalone: true,
  imports: [UserAvatarComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInputComponent {
  #r2 = inject(Renderer2);
  #postService = inject(PostService);
  #cdr = inject(ChangeDetectorRef)

  created = output()
  isCommentInput = input<boolean>(false)
  postId = input<number>(0)
  profile = inject(ProfileService).me;

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  postText: string = '';

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.#r2.setStyle(textarea, 'height', 'auto');
    this.#r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.#postService.createComment({
          text: this.postText,
          authorId: this.profile()!.id,
          postId: this.postId()
        })
      ).then(() => {
        this.postText = ''
        this.created.emit()
        this.#cdr.markForCheck()
      })

      return
    }

    firstValueFrom(
      this.#postService.createPost({
        title: 'Клевый пост',
        content: this.postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {
      this.postText = ''
      this.#cdr.markForCheck()
    })
  }
}
