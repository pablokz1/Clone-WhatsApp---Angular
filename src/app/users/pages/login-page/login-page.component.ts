import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { catchError, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="container red">
      <div>Escolha um login</div>

      <input type="file" #input (change)="onFileSelected($event)" />

      @for (userImage of users$ | async; track userImage.user.id) {
      <div class="user">
        @if(userImage.imageUrl){
          <img [src]="userImage.imageUrl" />
        }
        @else {
          <span>N/A</span>
        }
        <span>{{ userImage.user.name }}</span>
        <button (click)="onImageButtonClicked(userImage.user.id)">IM</button>
      </div>
      }
    </div>
  `,
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  @ViewChild('input', { static: true, read: ElementRef })
  inputFile!: ElementRef;
  private userService = inject(UserService);
  private lastUserIdClicked = '';
  protected users$ = this.userService.getUsers();

  refreshUsers() {
    this.users$ = this.userService.getUsers().pipe(
      catchError((err) => {
        console.log('Deu erro', err);
        return of([]);
      })
    );
  }

  onFileSelected(event: any) {
    const selectedFiles = event.target.files as FileList;

    if (selectedFiles.length === 0) {
      return;
    }

    const file = selectedFiles[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const fileInBytes = reader.result as ArrayBuffer;
      this.userService
        .uploadUserImage(this.lastUserIdClicked, fileInBytes)
        .subscribe(() => this.refreshUsers());
    };
  }

  onImageButtonClicked(userId: string) {
    this.lastUserIdClicked = userId;
    this.inputFile.nativeElement.click();
  }
}
