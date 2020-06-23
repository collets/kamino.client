import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _authService: BaseAuthService, private _router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._userIsLogged(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this._userIsLogged(state);
  }

  private _userIsLogged(state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._authService.logged$.pipe(
      filter(result => result !== null && result !== undefined),
      map(result => !!result ? result : this._router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url }}))
    );
  }
}
