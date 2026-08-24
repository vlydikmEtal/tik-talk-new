import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {ProfileService} from '../../../data/services/profile.service';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'tt-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFiltersComponent {
  #fb = inject(FormBuilder)
  #profileService = inject(ProfileService)

  searchForm = this.#fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  })

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        distinctUntilChanged(),
        debounceTime(500),
        switchMap(formValue => this.#profileService.filterProfiles(formValue)),
        takeUntilDestroyed()
      )
      .subscribe()
  }
}
