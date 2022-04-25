import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/@core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demo-project';
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.onRedirect();
  }

  onRedirect() {
    this._authService.isAuthenticated.subscribe(val => {
      if (!val) return this._router.navigateByUrl('/login');

    })

  }
}
