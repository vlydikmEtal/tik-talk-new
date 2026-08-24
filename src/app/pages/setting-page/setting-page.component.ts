import {AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, OnInit, viewChild} from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';
import {AuthService} from '../../auth/auth.service';
import {firstValueFrom} from 'rxjs';
import {RouterLink} from '@angular/router';
import {ProfileStackComponent} from '../../common-ui/profile-stack/profile-stack.component';
import {AvatarUploadComponent} from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'tt-setting-page',
  standalone: true,
  imports: [ProfileHeaderComponent, ReactiveFormsModule, SvgIconComponent, RouterLink, ProfileStackComponent, AvatarUploadComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingPageComponent {
  #profileService = inject(ProfileService);
  #authService = inject(AuthService);
  #fb = inject(FormBuilder);

  avatarUploader = viewChild(AvatarUploadComponent)

  profile = this.#profileService.me;

  form = this.#fb.group({
    firstName: this.#fb.control<string>('', [Validators.required]),
    lastName: this.#fb.control<string>('', [Validators.required]),
    username: this.#fb.control<string>({value: '', disabled: true}, [Validators.required]),
    description: this.#fb.control<string>(''),
    stack: this.#fb.control<string>(''),
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.#profileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.#profileService.me()?.stack)
        })
    });
  }

  async logout() {
    await firstValueFrom(this.#authService.exit())
  }

  async onSave() {
    const avatarUploader = this.avatarUploader()

    if (!avatarUploader) return

    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    if (avatarUploader.avatar) {
      await firstValueFrom(this.#profileService.uploadAvatar(avatarUploader.avatar))
    }

    //@ts-ignore
    await firstValueFrom(this.#profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack),
    }))
  }

  splitStack(stack: string | null | string[] | undefined): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack;

    return stack.split(',').map(str => str.trim()).filter(s => s !== '')
  }

  mergeStack(stack: string | null | string[] | undefined)  {
    if (!stack) return ''
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
