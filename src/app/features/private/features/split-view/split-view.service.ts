import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SplitViewService {
  readonly TRANSITION_TIME_MS: number = 500;
  activeCanvas$: Observable<string>;
  private activeCanvasSubject: BehaviorSubject<string>;

  constructor() {
    this.activeCanvasSubject = new BehaviorSubject<string>('feature-a');
    this.activeCanvas$ = this.activeCanvasSubject.asObservable();
  }

  getActiveCanvas(): string {
    return this.activeCanvasSubject.getValue();
  }

  setActiveCanvas(route: string): void {
    this.activeCanvasSubject.next(route);
  }
}
