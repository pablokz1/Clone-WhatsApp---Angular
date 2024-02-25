import { Component, inject } from '@angular/core';
import { UserService } from '../../../users/user.service';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [JsonPipe],
  template: `
    <p>
      Usuário logado: {{ userInfo()!.name }}  
    </p>

    <div>
      <button (click)="logoutClick()">LOGOUT</button>
    </div>
  `,
  styleUrl: './conversation-page.component.scss'
})
export default class ConversationPageComponent {
  private userService = inject(UserService);
  protected userInfo = this.userService.getUserInfoSignal();

  logoutClick() {
    this.userService.logout();
  }
}
