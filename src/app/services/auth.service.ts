import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OkAuth } from '../models/auth.inteface';
import { authKey } from '../utils/key-storage.util';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../models/user-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  requestLogin(auth: UserAuth): Observable<OkAuth> {
    const url = environment.api + environment.backend.apiLogin;
    return this.http.post<OkAuth>(url, JSON.stringify(auth));
  }

}
