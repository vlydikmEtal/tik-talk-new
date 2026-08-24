import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';

@Component({
  selector: 'tt-profile-header',
  standalone: true,
  imports: [
    UserAvatarComponent,
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileHeaderComponent {
  profile = input<Profile>()
}
