import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';
import { environment } from '@@environment/environment';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LocalDb } from '../local-db/local-db';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private urlApi = `${environment.urlApi}User`;

  getUsers() {
    return this.http.get<User[]>(`${this.urlApi}`).pipe(
      // Após exexutar a busca de um usuário, estou execultando outra requisição...
      switchMap((users) => {
        // Montando uma requisição para cada usuário mas nã estou executando...
        const userImageRequest = users.map((user) =>
          // Para cada usuário, estou criando uma requisição de imagem...
          this.getuserImage(user.id).pipe(
            // Caso a imagem não exista, estou interceptando para não querar...
            catchError((_) => of(null)),
            // Estou obtendo a imagem e criando um novo objeto com os dados do usuário e imagem....
            map((image) => ({
              user,
              image,
            }))
          )
        );
        // O switchMap obriga a retornar um observable, o forkJoin funciona como um Promise.All
        // Ele executa um array de observable ao mesmo tempo...
        return forkJoin(userImageRequest);
      }),
      // Salvando imagens no banco local (indexDb)...
      tap((userImages) => {
        new LocalDb().addUser(
          userImages.map((userImage) => ({
            id: userImage.user.id,
            name: userImage.user.name,
            imageBlob: userImage.image,
          }))
        );
      }),
      // Transformando as imagens em URLs...
      map((userImages) =>
        userImages.map((userImageBlob) => {
          return {
            user: userImageBlob.user,
            imageUrl:
              userImageBlob.image && URL.createObjectURL(userImageBlob.image),
          };
        })
      )
    );
  }

  private getuserImage(userId: string) {
    return this.http.get(`${this.urlApi}/${userId}/image`, {
      responseType: 'blob',
    });
  }

  uploadUserImage(userId: string, image: ArrayBuffer) {
    const blobImage = new Blob([image]);
    const formData = new FormData();
    formData.append('file', blobImage);
    return this.http.put(`${this.urlApi}/${userId}/image`, formData);
  }
}
