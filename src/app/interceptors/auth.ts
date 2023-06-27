import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/user-auth.interface';
import { first, mergeMap, switchMap, switchMapTo } from 'rxjs/operators';
import { OkAuth } from '../models/auth.inteface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | HttpEvent<any>> {
        //any alteration in httpRequest can be done here
        /*const defaultUser: UserAuth = { login: "manuel.saavedra@ensitech.com", password: "123admin123" };
        return this.authService.requestLogin(defaultUser)
            .pipe(switchMap((resp) => {
                console.log(resp);
                if (resp.token) {
                    req = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${resp.token}`,
                        },
                    });
                    return next.handle(req);
                }
                return next;
            }));*/
        return next.handle(req);
    }
}