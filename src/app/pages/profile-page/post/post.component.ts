import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'tt-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {

}
