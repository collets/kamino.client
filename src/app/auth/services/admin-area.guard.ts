import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';

@Injectable()
export class AdminAreaGuard implements CanActivate {
  constructor(private _authService: BaseAuthService, private _router: Router) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._userIsLogged(state);
  }

  private _userIsLogged(state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this._authService.logged$.pipe(
      filter(result => result !== null && result !== undefined),
      map(result => !result ? true : this._router.createUrlTree(['admin'], { queryParams: { returnUrl: state.url }}))
    );
  }
}
