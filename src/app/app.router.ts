import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveAuthenticationGuard } from 'src/@shared';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./layout/layout.router').then(m => m.LayoutRoutingModule),
    canActivate: [ActiveAuthenticationGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule),
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
