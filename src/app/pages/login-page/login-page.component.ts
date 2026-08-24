import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {LoginForm} from '../../auth/auth.interface';
import {Router} from '@angular/router';
import {SvgIconComponent} from '../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'tt-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: 'login-page.component.html',
  styleUrl: 'login-page.component.scss'
})
export class LoginPageComponent {
  #fb = inject(FormBuilder)
  #authService = inject(AuthService)
  #router = inject(Router)

  isPasswordVisible = signal<boolean>(false)

  form = this.#fb.group<LoginForm>({
    username: this.#fb.control<string>('againstallodds6', {nonNullable: true, validators: [Validators.required]}),
    password: this.#fb.control<string>('', {nonNullable: true, validators: [Validators.required]}),
  })

  onSubmit() {
    if (this.form.valid) {
      this.#authService.login(this.form.getRawValue())
        .subscribe(() => {
          this.#router.navigate([''])
        })
    }
  }
}
