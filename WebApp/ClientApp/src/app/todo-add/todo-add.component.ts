import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {v7} from 'uuid';
import {TodoService} from "../services/todo/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {take} from "rxjs";
import {Todo} from "../models/todo/todo";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-todo-add',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatError,
    MatFabButton,
    MatIcon,
    NgIf
  ],
  templateUrl: './todo-add.component.html',
  styleUrl: './todo-add.component.scss'
})
export class TodoAddComponent implements OnInit {
  formGroup!: FormGroup;
  editing = false;
  private _snackBar = inject(MatSnackBar);
  private _destroyRef = inject(DestroyRef);

  constructor(private todoService: TodoService,
              private activatedRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params["id"];
    if (id) {
      this.editing = true;
      this.todoService.getById(id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(value => {
          this.createForm(value);
        });
    } else {
      this.createForm(null);
    }
  }

  private createForm(todo: Todo | null) {
    this.formGroup = new FormGroup({
      id: new FormControl(todo?.id ?? v7(), [Validators.required]),
      name: new FormControl(todo?.name ?? '', [Validators.required]),
      description: new FormControl(todo?.description ?? '', [Validators.required])
    });
  }

  add() {
    if (this.editing) {
      this.todoService.update({
        todo: this.formGroup.value
      }).subscribe(result => {
        this._snackBar.open('Updated successfully!', '', {
          duration: 3000
        });
        this.router.navigate(['/', 'home']);
      });
    } else {
      this.todoService.add({
        todo: this.formGroup.value
      }).subscribe(result => {
        this._snackBar.open('Added successfully!', '', {
          duration: 3000
        });
        this.router.navigate(['/', 'home']);
      });
    }
  }
}
