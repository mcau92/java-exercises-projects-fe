import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { MessageService } from '../../service/messages/message.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string = env.url + "/api/users";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }


  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + "/fetchAllUsers").pipe(
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  public getUser(id: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/getUser/" + id).pipe(
      catchError(this.handleError<User>('getUser id=${id}'))
    );
  }
  public deleteUser(id: string): Observable<Boolean> {
    return this.http.delete<Boolean>(this.usersUrl + "/deleteUser/" + id).pipe(
      catchError(this.handleError<Boolean>('deleteUser id=${id}'))
    );
  }
  //update insert
  public updateUser(selectedUser: User): Observable<User> {
    return this.http.put(this.usersUrl + '/updateUser', selectedUser, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }
  public addUser(selectedUser: User): Observable<User> {
    return this.http.post(this.usersUrl + '/insertUser', selectedUser, this.httpOptions).pipe(
      catchError(this.handleError<any>('insertUser'))
    );
  }

  //---------------UTILITY METHODS---------------
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
