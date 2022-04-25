import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post.router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  declarations: [
    PostListComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
  ]
})
export class PostModule { }
