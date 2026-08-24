import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom} from 'rxjs';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {Profile} from '../../data/interfaces/profile.interface';
import {ProfileFiltersComponent} from './profile-filters/profile-filters.component';

@Component({
  selector: 'tt-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent {
  #profileService = inject(ProfileService);

  profiles = this.#profileService.filteredProfiles

  async handleSubscribe(userId: number) {
    if (!userId) return

    await firstValueFrom(this.#profileService.makeSubscribe(userId))
  }
}
