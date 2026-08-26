import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ImgUrlPipe} from "../../helpers/pipes/image-url.pipe";

@Component({
  selector: 'tt-user-avatar',
  standalone: true,
    imports: [
        ImgUrlPipe
    ],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {
  avatarUrl = input<string | null>(null)
}
