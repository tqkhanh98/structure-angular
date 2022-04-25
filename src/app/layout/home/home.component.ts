import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/@core';

enum IndexTab {
  POSTS = 0,
  USER = 1,
  LOGOUT = 99,
}
const LogoutName = 'Logout'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  tabs = [
    {
      name: 'Posts',
      index: IndexTab.POSTS
    },
    {
      name: 'User',
      index: IndexTab.USER
    },
    {
      name: LogoutName,
      index: IndexTab.LOGOUT
    },
  ]
  selectedIndex: number = 0;
  constructor(private _router: Router,
    private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.onRedirect()
  }

  onRedirect() {
    let url = window.location.href;
    if (url.includes('user')) return this.onTabChange(IndexTab.USER, true);
    else if (url.includes('post')) return this.onTabChange(IndexTab.POSTS, true);
  }

  onTabChange(event: any, init?: boolean) {
    init ? (this.selectedIndex = event) : (this.selectedIndex = event?.index);
    switch (event?.index) {
      case IndexTab.USER:
        return this.navigateTo('user/list');
      case IndexTab.POSTS:
        return this.navigateTo('post/list');
    }
    if (event?.tab?.textLabel === LogoutName) return this._authService.onLogout();
  }

  navigateTo(location: string) {
    return this._router.navigate([location]);
  }

}
