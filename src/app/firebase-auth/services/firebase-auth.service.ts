import { Injectable } from '@angular/core';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IFirebaseAuthServiceState } from '../interfaces/firebase-auth.state.interface';
import { User } from 'firebase';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements BaseAuthService {

  private _state: IFirebaseAuthServiceState;
  private _logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean|null>(null);

  constructor(
    private _angulaFireAuth: AngularFireAuth,
    private _router: Router
  ) { 
    this._angulaFireAuth.user.subscribe((user: User|null) => {
      this._updateState({
        user: user,
        loggedIn: !!user
      });
      this._logged$.next(this._state.loggedIn);
    });
  }

  public get logged$(): Observable<boolean> {
    return this._logged$.asObservable();
  }

  async login(email: any, password: any): Promise<boolean | string> {
    try {
      await this._angulaFireAuth.signInWithEmailAndPassword(email, password);
      return true;
    } catch(e) {
      return e.code === 'auth/wrong-password' ? 'Email or password wrong' : e.message;
    }
  }

  async logout(): Promise<void> {
    try {
      await this._angulaFireAuth.signOut();
      this._router.navigate(['/admin']);
    } catch(e) {
      console.log('There was an unexpected error. Please contact the support.'); 
    }
  }

  private _updateState(state: IFirebaseAuthServiceState) {
    this._state = {...this._state, ...state};
  }
}
