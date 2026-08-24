import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ImgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '/assets/images/svg/avatar.svg';

    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
