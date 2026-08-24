import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'tt-profile-stack',
  standalone: true,
  imports: [],
  templateUrl: './profile-stack.component.html',
  styleUrl: './profile-stack.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileStackComponent {
  profile = input<Profile>()
}
