import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "./user.model";
import { environment } from "@@environment/environment";


@Injectable({
    providedIn: "root"
})

export class UserService {

    private http = inject(HttpClient);
    private urlApi = `${environment.urlApi}User`

    getUsers() {
        return this.http.get<User[]>(`${this.urlApi}`)
    }
}