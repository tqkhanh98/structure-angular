import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PostRoutingModule } from './post.router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/@shared/shared.module';


@NgModule({
  declarations: [
    PostListComponent,
    PostFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,

  ],
  providers: [DatePipe]
})
export class PostModule { }
