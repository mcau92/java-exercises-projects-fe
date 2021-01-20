import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from '../../../environments/environment'
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  ngOnInit(): void {
  }
  private usersUrl: string=env.url+"/api/users";
  constructor(private http: HttpClient) { }


  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl+"/fetchAllUsers");
  }
  public getUser(id:string): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl+"/getUser/"+id);
  }
}
