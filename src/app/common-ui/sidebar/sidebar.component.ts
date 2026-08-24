import {
  ChangeDetectionStrategy,
  Component,
  inject, OnInit,
} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProfileService } from '../../data/services/profile.service';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {Profile} from '../../data/interfaces/profile.interface';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/image-url.pipe';
import {UserAvatarComponent} from '../user-avatar/user-avatar.component';

@Component({
  selector: 'tt-sidebar',
  standalone: true,
  imports: [RouterLink, SvgIconComponent, SubscriberCardComponent, ImgUrlPipe, UserAvatarComponent, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  #profileService = inject(ProfileService);
  me = this.#profileService.me

  subscribers = toSignal(this.#profileService.getSubscribersShortList(), {
    initialValue: [] as Profile[]
  });

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];
}
