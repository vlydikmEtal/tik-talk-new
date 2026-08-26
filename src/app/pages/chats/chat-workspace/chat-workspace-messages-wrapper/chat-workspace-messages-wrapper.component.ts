import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessagesWrapperComponent {

}
