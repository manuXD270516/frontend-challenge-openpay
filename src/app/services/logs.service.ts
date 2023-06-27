import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LogEndpoint } from '../models/log.inteface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {}

  getAllLogs(): Observable<LogEndpoint> {
    const url = environment.api + environment.backend.logsApi;
    return this.http.get<LogEndpoint>(url)
      .pipe(map((resp) => resp));
  }
}
