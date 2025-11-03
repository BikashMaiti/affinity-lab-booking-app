import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ExceptionHandling {
    errorHandling = <T>(source$: Observable<T>): Observable<T> => {
        return source$.pipe(
            catchError((error: HttpErrorResponse | ErrorEvent) =>
                this.handleError(error)
            )
        );
    };

    private handleError(error: HttpErrorResponse | ErrorEvent): Observable<never> {
        let errorMessage = this.getErrorMessage(error);

        // Perform special actions for specific errors
        if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
                this.handleUnauthorized();
            }
        }

        return throwError(() => new Error(errorMessage));
    }

    private getErrorMessage(error: HttpErrorResponse | ErrorEvent): string {
        if (error instanceof HttpErrorResponse) {
            return this.getServerErrorMessage(error);
        }
        return this.getClientErrorMessage(error);
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 400: return error.error?.message || 'Invalid request';
            case 401: return 'Session expired. Redirecting to login...';
            case 404: return 'Requested resource not found';
            case 409: return error.error;
            case 500: return 'Server error. Please try again later';
            default: return error.message || 'Unknown server error';
        }
    }

    private getClientErrorMessage(error: ErrorEvent): string {
        return error.message || 'Check your network connection';
    }

    private handleUnauthorized(): void {
        localStorage.clear();
        window.location.href = '/#/login';
    }
}