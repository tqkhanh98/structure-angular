import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormLogin } from 'src/@core';
import { AuthenticationService } from 'src/@core/services/auth/authentication.service';
import { NotificationController } from 'src/@shared/controllers/notiController';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private fb: FormBuilder,
    private notiService: NotificationController,
    private authService: AuthenticationService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.formLogin.invalid) return;
    let loginF: FormLogin = this.formLogin.value;
    if (loginF.user.toLocaleLowerCase().trim() === 'admin' && loginF.password.toLocaleLowerCase().trim() === '123') {
      this.authService.onAuthenticated(true);
      this.authService.setAccountToStore(loginF);
      this.notiService.openSuccess('Login successfully!');
      this.authService.isAuthenticated.subscribe(val => {
        val && this.router.navigate(['post/list']);
      })
    }
    else {
      this.notiService.openError('Wrong user or password. Please try agian!');
      return this.authService.onAuthenticated(false);
    }
  }



}
