import {Component, input} from '@angular/core';
import {ImgUrlPipe} from "../../helpers/pipes/image-url.pipe";
import {Profile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'tt-user-avatar',
  standalone: true,
    imports: [
        ImgUrlPipe
    ],
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {
  profile = input<Profile>()
}
