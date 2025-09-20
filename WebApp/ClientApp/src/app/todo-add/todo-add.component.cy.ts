import {ReactiveFormsModule} from "@angular/forms";
import {MatFabButton} from "@angular/material/button";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {TodoAddComponent} from "../todo-add/todo-add.component";
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {TodoService} from "../services/todo/todo.service";
import {of} from "rxjs";
import {NgIf} from "@angular/common";
import {TodoAddRequestModel} from "../models/todo/todo-add-request.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DestroyRef} from "@angular/core";

describe('TodoAddComponent', () => {
  const todoService: any =
    {
      getById: (id: string) => {
        return of({
          id: '1',
          name: 'Test',
          description: 'Test'
        });
      },
      update: (request: TodoAddRequestModel) => {
        return of(true);
      }
    };

  const router: any = {
    navigate: (commands: readonly any[], extras?: NavigationExtras): Promise<boolean> => {
      return Promise.resolve(true);
    }
  };

  const activatedRouter: any = {
    snapshot: {
      params: {
        'id': '222'
      }
    }
  };

  beforeEach(() => {
    cy.spy(router, 'navigate').as('routerSpy');
    cy.spy(todoService, 'update').as('todoServiceUpdateSpy')

    cy.mount(TodoAddComponent, {
      imports: [
        MatFormField,
        MatInput,
        MatLabel,
        MatFormField,
        ReactiveFormsModule,
        MatError,
        MatFabButton,
        MatIcon,
        NgIf],
      providers: [
        MatSnackBar,
        DestroyRef,
        {
          provide: ActivatedRoute,
          useValue: activatedRouter
        },
        {
          provide: TodoService,
          useValue: todoService
        }, {
          provide: Router,
          useValue: router
        }, MatDialog],
    })
  });

  it('should create', () => {
    cy.get('input[matInput]').should('have.value', 'Test');
    cy.get('textarea[matInput]').should('have.value', 'Test');
  });

  it('should call updated', () => {
    cy.get('button').first().click();
    cy.get('@todoServiceUpdateSpy').should('have.been.called');
    cy.get('@routerSpy').should('have.been.called');
  });
});
