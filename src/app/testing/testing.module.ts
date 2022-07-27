import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestingComponent } from './testing.component';
import { MatSelectModule } from '@angular/material/select';
import { TestingRoutingModule } from './testing.router';
import { SharedModule } from 'src/@shared/shared.module';

@NgModule({
    declarations: [
        TestingComponent
    ],
    imports: [
        CommonModule,
        TestingRoutingModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatSelectModule,
        MatButtonModule
    ]
})
export class TestingModule { }
