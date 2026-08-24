import {
  ChangeDetectionStrategy,
  Component, computed, inject,
  input,
  output, signal,
} from '@angular/core';
import { ProfileTagComponent } from '../profile-tag/profile-tag.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/image-url.pipe';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterLink } from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';

@Component({
  selector: 'tt-profile-card',
  standalone: true,
  imports: [ProfileTagComponent, ImgUrlPipe, SvgIconComponent, RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  profile = input<Profile>();
  subscribe = output<number>();

  isSubscribe = signal<boolean>(false)

  onSubscribe() {
    const profile = this.profile();

    if (!profile) return;

    this.subscribe.emit(profile.id);

    this.isSubscribe.update(v => !v)
  }

  isSubscribed = computed(() => {
    return this.isSubscribe() ? 'Подписан' : 'Подписаться';
  })
}
