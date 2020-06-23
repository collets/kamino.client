import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './routes/sign-in/sign-in.component';
import { BaseAuthService } from '../core/interfaces/base-auth-service';
import { FirebaseAuthService } from '../firebase-auth/services/firebase-auth.service';
import { AuthGuard } from './services/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AdminAreaGuard } from './services/admin-area.guard';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: BaseAuthService, useExisting: FirebaseAuthService },
    AuthGuard,
    AdminAreaGuard
  ]
})
export class AuthModule { }
