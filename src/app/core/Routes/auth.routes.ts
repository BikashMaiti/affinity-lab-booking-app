import { Routes } from '@angular/router';

export const AUTH_ROUTE: Routes = [
    {
        path: '',
        redirectTo: () => {
            return 'login'
        },
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('../../shared/layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
        children: [
            {
                path: 'login',
                loadComponent() {
                    return import('../../modules/auth/component/sign-in/sign-in').then(m => m.SignIn);
                },
            },
            {
                path: 'register',
                loadComponent() {
                    return import('../../modules/auth/component/sign-up/sign-up').then(m => m.SignUp);
                }
            }
        ]
    }
]