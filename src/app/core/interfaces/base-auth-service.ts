import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class BaseAuthService {
    abstract get logged$(): Observable<boolean>;
    abstract async login(email, password): Promise<boolean | string>;
    abstract async logout(): Promise<void>;
}
