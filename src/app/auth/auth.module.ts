import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { BaseAuthService } from '../core/interfaces/base-auth-service';
import { FirebaseAuthService } from '../firebase-auth/services/firebase-auth.service';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    { provide: BaseAuthService, useExisting: FirebaseAuthService },
    AuthGuard
  ]
})
export class AuthModule { }
