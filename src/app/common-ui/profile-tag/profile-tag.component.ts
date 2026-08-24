import {Component, input} from '@angular/core';

@Component({
  selector: 'app-profile-tag',
  standalone: true,
  imports: [],
  templateUrl: './profile-tag.component.html',
  styleUrl: './profile-tag.component.scss'
})
export class ProfileTagComponent {
  tag = input<any>()
}
