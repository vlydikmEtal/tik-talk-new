import {FormControl} from '@angular/forms';

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
