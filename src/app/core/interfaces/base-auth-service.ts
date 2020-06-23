import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Injectable()
export abstract class BaseAuthService {
    abstract get logged$(): Observable<boolean>;
    abstract get loggedUser(): User | null
    abstract async login(email, password): Promise<boolean | string>;
    abstract async logout(): Promise<void>;
}
