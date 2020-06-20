import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { BaseAuthService } from '../core/interfaces/base-auth-service';
import { FirebaseAuthService } from '../firebase-auth/services/firebase-auth.service';
import { AuthGuard } from './services/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: BaseAuthService, useExisting: FirebaseAuthService },
    AuthGuard
  ]
})
export class AuthModule { }
