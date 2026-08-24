import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="href()"></svg:use>',
  styles: ['']
})
export class SvgIconComponent {
  icon = input<string>('');

  href = computed(() => {
    if (!this.icon()) return

    const name = this.icon()
    return `/assets/images/svg/${name}.svg#${name}`;
  })
}
