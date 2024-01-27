import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { catchError, of, take } from 'rxjs';
import { User } from '../../user.model';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [ AsyncPipe ],
  template: `
    <div class="container red">
      <div>Escolha um login</div>

      <input type="file" #input />

      @for (user of users$ | async; track user.id) {
        <div class="user">
          <img src="" alt="" />
          <span>{{user.name}}</span>
          <button (click)="input.click()">IM</button>
        </div>
      }

    </div>
  `,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private userService = inject(UserService);
  protected users$ = this.userService.getUsers()
  .pipe(
    catchError(err => {
      console.log("Deu erro", err);
      return of([])
    })
  );

}
