import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationExtras, Router, RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
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
import {MatProgressBar} from "@angular/material/progress-bar";
import {of} from "rxjs";
import {AppComponent} from "./app.component";
import {TodoAddComponent} from "./todo-add/todo-add.component";
import {TodoService} from "./services/todo/todo.service";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

describe('AppComponent', () => {
  const todoService: any =
    {
      get: () => {
        return of([{
          id: '1',
          name: 'Test',
          description: 'Test'
        }]);
      }
    };

  const router: any = {
    navigate: (commands: readonly any[], extras?: NavigationExtras): Promise<boolean> => {
      return Promise.resolve(true);
    }
  };

  beforeEach(() => {
    cy.spy(router, 'navigate').as('routerSpy')

    cy.mount(AppComponent, {
      imports: [BrowserModule,
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
        MatProgressBar, HeaderComponent, FooterComponent],
      providers: [{
        provide: TodoService,
        useValue: todoService
      }, {
        provide: Router,
        useValue: router
      }, MatDialog],
    })
  });

  it('should call add', () => {
    cy.get('app-header button')
      .then(currentSubject => {
        currentSubject[0].click();
        cy.get('@routerSpy').should('have.been.calledOnceWith', ['todo', 'add']);
      })
  });
});
