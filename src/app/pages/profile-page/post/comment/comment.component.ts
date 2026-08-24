import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommentPost} from '../../../../data/interfaces/post.interface';
import {UserAvatarComponent} from '../../../../common-ui/user-avatar/user-avatar.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'tt-comment',
  standalone: true,
  imports: [
    UserAvatarComponent,
    DatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  comment = input<CommentPost>()
}
