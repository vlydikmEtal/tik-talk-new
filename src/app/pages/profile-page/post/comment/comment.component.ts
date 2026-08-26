import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommentPost} from '../../../../data/interfaces/post.interface';
import {UserAvatarComponent} from '../../../../common-ui/user-avatar/user-avatar.component';
import {DatePipe} from '@angular/common';
import {CurrentDatePipe} from '../../../../helpers/pipes/current-date.pipe';

@Component({
  selector: 'tt-comment',
  standalone: true,
  imports: [
    UserAvatarComponent,
    DatePipe,
    CurrentDatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  comment = input<CommentPost>()
}
