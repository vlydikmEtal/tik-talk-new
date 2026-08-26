import {
  ChangeDetectionStrategy,
  Component, HostBinding,
  inject, input, output,
  Renderer2, signal,
} from '@angular/core';
import { UserAvatarComponent } from '../../../common-ui/user-avatar/user-avatar.component';
import { ProfileService } from '../../../data/services/profile.service';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { FormsModule } from '@angular/forms';

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
  profile = inject(ProfileService).me;

  created = output<string>()

  postText = signal<string>('')
  isCommentInput = input<boolean>(false)
  postId = input<number>(0)

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

    this.#r2.setStyle(textarea, 'height', 'auto');
    this.#r2.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    const text = this.postText();

    if (!text || text.length === 0) return

    this.created.emit(text)
    this.postText.set('')
  }
}
