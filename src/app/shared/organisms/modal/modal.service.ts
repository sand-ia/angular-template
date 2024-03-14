import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  activeModal$: Observable<boolean | null>;
  private activeModalSubject: BehaviorSubject<boolean | null>;

  constructor() {
    this.activeModalSubject = new BehaviorSubject<boolean | null>(true);
    this.activeModal$ = this.activeModalSubject.asObservable();
  }

  getActiveModal(): boolean | null {
    return this.activeModalSubject.getValue();
  }

  setActiveModal(modal: boolean | null): void {
    this.activeModalSubject.next(modal);
  }
}
