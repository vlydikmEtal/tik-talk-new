import {Component, input} from '@angular/core';
import {ProfileTagComponent} from '../profile-tag/profile-tag.component';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    ProfileTagComponent
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  profile = input<any>()
}
