import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import { map, switchMap, tap } from 'rxjs';
import { Pageble } from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/account/';

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  getMe() {
    return this.#http
      .get<Profile>(`${this.baseApiUrl}me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccountId(id: string) {
    return this.#http.get<Profile>(`${this.baseApiUrl}${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.#http
      .get<Pageble<Profile>>(`${this.baseApiUrl}subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.#http.patch<Profile>(`${this.baseApiUrl}me`, profile);
  }

  makeSubscribe(id: number) {
    return this.#http.post<string>(`${this.baseApiUrl}subscribe/${id}`, null);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.#http.post(`${this.baseApiUrl}upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.#http
      .get<Pageble<Profile>>(`${this.baseApiUrl}accounts`, {
        params,
      })
      .pipe(tap((res) => this.filteredProfiles.set(res.items)));
  }
}
