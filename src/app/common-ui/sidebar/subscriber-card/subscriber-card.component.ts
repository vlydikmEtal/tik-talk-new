import {Component, input} from '@angular/core';
import {Profile} from '../../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../../helpers/pipes/image-url.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'tt-subscriber-card',
  standalone: true,
  imports: [
    ImgUrlPipe,
    RouterLink
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  subscribers = input<Profile>()
}
