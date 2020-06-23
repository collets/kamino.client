import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';
import { User } from 'firebase';

@Component({
  selector: 'kmn-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class.kmn-sidebar': 'true' }
})
export class SidebarComponent implements OnInit {

  public profileName: string;

  constructor(private _authService: BaseAuthService) { }

  ngOnInit(): void {
    this.profileName = this._authService.loggedUser?.displayName ?? this._authService.loggedUser?.email;
  }

  onLogout() {
    this._authService.logout();
  }
}
