import { Routes } from '@angular/router';
import { LoginPageComponent } from './users/pages/login-page/login-page.component';
import { isUserLoggedGuard } from './guards/is-user-logged.can-activate.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginPageComponent
    },
    {
        path: "conversations",
        loadComponent: () => import('./conversations/pages/conversation-page/conversation-page.component'),
        canActivate: [isUserLoggedGuard]
    }
];
