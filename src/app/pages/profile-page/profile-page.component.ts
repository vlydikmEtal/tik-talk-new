import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {SubscriberCardComponent} from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/image-url.pipe';
import {PostFeedComponent} from './post-feed/post-feed.component';

@Component({
  selector: 'tt-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService)
  #route = inject(ActivatedRoute)

  me$ = toObservable(this.#profileService.me)

  subscribers = toSignal(this.#profileService.getSubscribersShortList(6), {
    initialValue: [] as Profile[]
  });

  profile = toSignal<Profile | null>(
    this.#route.params.pipe(
      switchMap(({id}) => {
        if (id === 'me') {
          return this.me$
        }

        return this.#profileService.getAccountId(id)
      })
    ),
    {initialValue: null}
  )
}
