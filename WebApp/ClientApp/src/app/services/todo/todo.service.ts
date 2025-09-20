import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoAddRequestModel} from "../../models/todo/todo-add-request.model";
import {Todo} from "../../models/todo/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient,
              @Inject('BASE_URL') private baseUrl: string) {
  }

  public add(request: TodoAddRequestModel): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.baseUrl}todo`, request);
  }

  public update(request: TodoAddRequestModel): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}todo`, request);
  }

  public get(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}todo`);
  }

  public delete(id: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}todo/${id}`);
  }

  public getById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(`${this.baseUrl}todo/${id}`);
  }
}
