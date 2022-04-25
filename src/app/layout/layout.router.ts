import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'post'
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'post',
        loadChildren: () => import('../post/post.module').then(m => m.PostModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
