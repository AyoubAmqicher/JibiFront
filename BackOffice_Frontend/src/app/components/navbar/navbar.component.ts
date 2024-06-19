import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownOpen = false;
  firstName = 'John';
  lastName = 'Doe';

  constructor(private authService:AuthService){}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(){
    if (window.confirm('Are you sure you want to log out?')) {
      this.authService.logout();
    }
  }

  hasRole(role : string){
    return this.authService.isUserInRole(role);
  }
}
