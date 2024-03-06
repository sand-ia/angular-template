import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplitViewService {
  public activeCanvas$: Observable<string>;
  private activeCanvasSubject: BehaviorSubject<string>;

  constructor() {
    this.activeCanvasSubject = new BehaviorSubject<string>('');
    this.activeCanvas$ = this.activeCanvasSubject.asObservable();
  }

  getActiveCanvas(): string {
    return this.activeCanvasSubject.getValue();
  }

  setActiveCanvas(route: string): void {
    this.activeCanvasSubject.next(route);
  }
}
