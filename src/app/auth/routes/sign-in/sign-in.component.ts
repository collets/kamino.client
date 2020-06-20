import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAuthService } from 'src/app/core/interfaces/base-auth-service';

@Component({
  selector: 'kmn-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public form: FormGroup;
  public error: string;
  public loading: boolean;

  private _returnUrl: string;

  constructor(
    private _authService: BaseAuthService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] ?? '/';
  }

  public get email() { return this.form.controls.email; }
  public get password() { return this.form.controls.password; }

  public async onSubmit() {
    if(this.form.invalid) return;
    this.loading = true;
    this.error = null;

    const result = await this._authService.login(this.email.value, this.password.value);

    this.loading = false;
    if (result !== true) {
      this.error = result as string;
      return;
    }

    this._router.navigate([this._returnUrl]);
  }
}
