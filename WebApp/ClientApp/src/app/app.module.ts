import {BrowserModule} from '@angular/platform-browser';
import {NgModule, APP_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTreeModule} from "@angular/material/tree";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatRippleModule} from "@angular/material/core";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatSidenavModule} from "@angular/material/sidenav";
import {TodoAddComponent} from "./todo-add/todo-add.component";
import {MatProgressBar} from "@angular/material/progress-bar";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'home'
        },
        {
          path: 'home',
          pathMatch: 'full',
          component: TodoListComponent
        },
        {
          path: 'todo/add',
          pathMatch: 'full',
          component: TodoAddComponent
        },
        {
          path: 'todo/:id',
          pathMatch: 'full',
          component: TodoAddComponent
        }
      ],
      {
        onSameUrlNavigation: "reload",
        bindToComponentInputs: true,
        scrollPositionRestoration: "top"
      }
    ),
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatSliderModule,
    MatToolbarModule,
    MatStepperModule,
    MatDialogModule,
    MatTreeModule,
    DragDropModule,
    OverlayModule,
    MatRippleModule,
    MatExpansionModule,
    MatTableModule,
    MatMenuModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatSidenavModule,
    MatProgressBar,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {provide: APP_ID, useValue: 'ng-cli-universal'},
  ],
  bootstrap:
    [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
