import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  dropdownOpen = false;
  firstName = 'John';
  lastName = 'Doe';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
