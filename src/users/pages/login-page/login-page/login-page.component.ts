import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `
   <div class="container red">
      <div>Escolha um login</div>
      
      <input type="file" #input>

      <div class="user">
        <img src="" alt="">
        <span>Nome Usuário 1</span>
        <button (click)="input.click()">Im</button>
      </div>
      
      <div class="user">
        <img src="" alt="">
        <span>Nome Usuário 2</span>
        <button (click)="input.click()">Im</button>
      </div>

      <div class="user">
        <img src="" alt="">
        <span>Nome Usuário 3</span>
        <button (click)="input.click()">Im</button>
      </div>

   </div>
  `,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

}
