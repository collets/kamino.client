import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';

@Component({
  selector: 'kmn-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _authService: BaseAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
  }
}
