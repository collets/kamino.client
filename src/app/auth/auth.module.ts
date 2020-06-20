import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './routes/forgot-password/forgot-password.component';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { BaseAuthService } from '../core/interfaces/base-auth-service';
import { FirebaseAuthService } from '../firebase-auth/services/firebase-auth.service';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    { provide: BaseAuthService, useExisting: FirebaseAuthService }
  ]
})
export class AuthModule { }
