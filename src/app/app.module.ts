import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from 'src/app/authentication/login/login.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from 'src/@core/core.module';
import { LayoutModule } from './layout/layout.module';
import { ActiveAuthenticationGuard, NotificationController } from 'src/@shared';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from 'src/@core';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { SharedModule } from 'src/@shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    LoginModule,
    StoreModule.forRoot(reducers),
    AppRoutingModule,
  ],
  providers: [
    ActiveAuthenticationGuard,
    NotificationController,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
