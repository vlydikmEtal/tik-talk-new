import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom, switchMap } from 'rxjs';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/image-url.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PostService } from '../../data/services/post.service';

@Component({
  selector: 'tt-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    RouterLink,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService);
  #postService = inject(PostService);
  #route = inject(ActivatedRoute);

  me$ = toObservable(this.#profileService.me);

  subscribers = toSignal(this.#profileService.getSubscribersShortList(6), {
    initialValue: [] as Profile[],
  });

  profile = toSignal<Profile | null>(
    this.#route.params.pipe(
      switchMap(({ id }) => {
        if (id === 'me') {
          return this.me$;
        }

        return this.#profileService.getAccountId(id);
      }),
    ),
    { initialValue: null },
  );

  constructor() {
    effect(() => {
      const currentProfile = this.profile();

      if (!currentProfile) return;

      if (currentProfile.id) {
        firstValueFrom(this.#postService.fetchPost(currentProfile.id));
      }
    });
  }
}
