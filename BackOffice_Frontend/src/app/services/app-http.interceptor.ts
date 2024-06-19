import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,HttpErrorResponse } from '@angular/common/http';
import { finalize, Observable, throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private loadingService:LoadingService,private router : Router,private authService : AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoadingSpinner();
    let token = sessionStorage.getItem("app.token");
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
        });
        this.authService.isAuthenticated = true;
    }

    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => this.handleErrorRes(error)),
        finalize(() => this.loadingService.hideLoadingSpinner()) // Hide the loading spinner
    );
}

private handleErrorRes(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
        this.router.navigateByUrl("/login", {replaceUrl: true});
    }
    return throwError(() => error);
}
}
