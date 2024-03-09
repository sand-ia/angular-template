import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterText$: Observable<string>;
  private filterTextSubject: BehaviorSubject<string>;

  constructor() {
    this.filterTextSubject = new BehaviorSubject<string>('');
    this.filterText$ = this.filterTextSubject.asObservable();
  }

  getFilterText(): string {
    return this.filterTextSubject.getValue();
  }

  setFilterText(newValue: string): void {
    this.filterTextSubject.next(newValue);
  }
}
