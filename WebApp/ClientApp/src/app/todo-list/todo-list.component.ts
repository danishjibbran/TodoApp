import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {TodoService} from "../services/todo/todo.service";
import {Todo} from "../models/todo/todo";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  standalone: false
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  readonly dialog = inject(MatDialog);
  private _destroyRef = inject(DestroyRef);

  constructor(private todoService: TodoService
    , private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.todoService.get()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      });
  }

  editTodo(id: string) {
    this.router.navigate(['/', 'todo', `${id}`])
  }

  addTodo() {
    this.router.navigate(['/', 'todo', 'add'])
  }

  deleteTodo(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (!dialogResult) {
        return;
      }
      this.todoService.delete(id).subscribe(result => {
        this.todos = this.todos.filter(x => x.id !== id);
      })
    });
  }
}
