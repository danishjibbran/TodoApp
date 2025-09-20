import {Component} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {
  }

  navigateTo(url: string[]) {
    this.router.navigate(url);
  }

}
