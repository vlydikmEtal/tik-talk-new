import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef, HostListener,
  inject,
  Renderer2,
  signal
} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {debounceTime, firstValueFrom, fromEvent} from 'rxjs';
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
export class SearchPageComponent implements AfterViewInit {
  #profileService = inject(ProfileService);
  #r2 = inject(Renderer2)
  #hostElementRef = inject(ElementRef);
  #destroyRef = inject(DestroyRef)

  profiles = this.#profileService.filteredProfiles

  async handleSubscribe(userId: number) {
    if (!userId) return

    await firstValueFrom(this.#profileService.makeSubscribe(userId))
  }

  resizeFeed() {
    const { top } = this.#hostElementRef.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 16;
    this.#r2.setStyle(this.#hostElementRef.nativeElement, 'height', `${height}px`);
  }

  ngAfterViewInit() {
    this.resizeFeed()

    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => this.resizeFeed())
  }
}
