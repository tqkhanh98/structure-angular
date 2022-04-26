import { NgModule } from "@angular/core";
import { ActiveAuthenticationGuard } from "./guard";

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from "@angular/common";
import { SpinnerComponent } from './components';
import { NgSelectModule } from '@ng-select/ng-select';

const services = [ActiveAuthenticationGuard];
const COMPONENTS = [
  SpinnerComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgSelectModule,
  ],
  providers: [],
  exports: [
    ...COMPONENTS,
    NgSelectModule
  ]
})

export class SharedModule { }