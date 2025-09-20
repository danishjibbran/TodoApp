import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

let lockResolver;
if (navigator && navigator.locks && navigator.locks.request) {
  const promise = new Promise((res) => {
    lockResolver = res;
  });

  navigator.locks.request('my_messaging_app', {mode: "shared"}, () => {
    return promise;
  });
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
