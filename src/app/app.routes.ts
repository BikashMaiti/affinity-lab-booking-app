import { Routes } from '@angular/router';
import { AUTH_ROUTE } from './core/Routes/auth.routes';
import { TRANSECTION_ROUTE } from './core/Routes/transaction.routes';

export const routes: Routes = [
{
    path:'',
    redirectTo:()=>{
        return 'login'
    },
    pathMatch:'full'
},
{
    path:'',
    loadChildren:()=>AUTH_ROUTE
},
{
    path:'transaction',
    loadChildren:()=>TRANSECTION_ROUTE
}
];
