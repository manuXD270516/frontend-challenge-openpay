import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SecureStorageService } from './secure-storage.service';
import { OkAuth } from '../models/auth.inteface';
import { authKey } from '../utils/key-storage.util';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../models/user-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private secureStorage: SecureStorageService) { }

  isLoggedIn() {
    return !!this.secureStorage.getStorage<OkAuth>(authKey.userLoginKey);
  }

  localSigninPersist(body: any) {
    this.secureStorage.setStorage(authKey.userLoginKey, body);
  }

  requestLogin(auth: UserAuth): Observable<OkAuth> {
    const url = environment.api + environment.backend.apiLogin;
    return this.http.post<OkAuth>(url, JSON.stringify(auth));
  }

  requestLogout() {
    this.secureStorage.cleanStorage();
  }

}
