import { TestBed } from '@angular/core/testing';

import { FirebaseAuthService } from './firebase-auth.service';
import { Observable, of } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth/';

describe('FirebaseAuthService', () => {
  let service: FirebaseAuthService;

  const email: string = 'email';
  const password: string = 'password';

  const mockAngularFireAuth: any = {
    user: of(null),
    signInWithEmailAndPassword: null,
    signOut: null
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }]
    });

    service = TestBed.inject(FirebaseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update logged$ with true if successfully login and return true', () => {
    const spy = spyOn(mockAngularFireAuth, 'signInWithEmailAndPassword').and.resolveTo({});
    spyOn(mockAngularFireAuth, 'user').and.returnValue(of({}));

    service.logged$
      .pipe(skip(1))
      .subscribe((logged) => {
        expect(logged).toBeTruthy();
      })

    service.login(email, password).then(value => expect(value).toBe(true));

    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it('should update logged$ with false if failed login and return an error', () => {
    const spy = spyOn(mockAngularFireAuth, 'signInWithEmailAndPassword').and.rejectWith({ code: 'auth/wrong-password' });
    spyOn(mockAngularFireAuth, 'user').and.returnValue(of(null));

    service.logged$
      .pipe(skip(1))
      .subscribe((logged) => {
        expect(logged).toBeFalse();
      });

    service.login(email, password).then(value => expect(value).toBe('Email or password wrong'));

    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it('should update logged$ with false if logout', () => {
    const spy = spyOn(mockAngularFireAuth, 'signOut').and.resolveTo();
    spyOn(mockAngularFireAuth, 'user').and.returnValue(of(null));

    service.logged$
      .pipe(skip(1))
      .subscribe((logged) => {
        expect(logged).toBeFalse();
      });

      service.logout();

      expect(spy).toHaveBeenCalled();
  })
});
