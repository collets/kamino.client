import { User } from 'firebase';

export interface IFirebaseAuthServiceState {
    user: User;
    loggedIn: boolean;
}