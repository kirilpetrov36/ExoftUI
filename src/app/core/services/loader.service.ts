import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
    providedIn: 'root',
  })
export class LoadingService {

    _loading$ = new BehaviorSubject<boolean>(false);
  
    constructor() {}

    // getLoading(): BehaviorSubject<boolean>{
    //     return this._loading$;
    // }
  
    show(): void {
      this._loading$.next(true);
    }
  
    hide(): void {
      this._loading$.next(false);
    }
}