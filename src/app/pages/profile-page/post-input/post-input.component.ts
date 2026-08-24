import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'tt-post-input',
  standalone: true,
  imports: [],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostInputComponent {

}
