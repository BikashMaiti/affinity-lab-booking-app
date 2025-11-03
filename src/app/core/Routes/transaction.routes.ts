import { Routes } from '@angular/router';

export const TRANSECTION_ROUTE: Routes = [
    {
        path: '',
        redirectTo: () => {
            return 'transaction/'
        },
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('../../shared/layouts/shared-layout/shared-layout').then(m => m.SharedLayout),
        children: [
            {
                path: 'dashboard',
                loadComponent() {
                    return import('../../shared/components/root-dashboard/root-dashboard.js').then(m => m.RootDashboard);
                },
            }
        ]
    }
]