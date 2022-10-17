import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { finalize } from "rxjs/internal/operators/finalize";
import { LoadingService } from "../services/loader.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoadingService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.show();
        //this.loaderService._loading$.subscribe(res => console.log(res));
        return next.handle(request).pipe(
            finalize(() => {
                this.loaderService.hide();
            })
        );
    }
}