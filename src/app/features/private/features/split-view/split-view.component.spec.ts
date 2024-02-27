import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitViewComponent } from './split-view.component';

describe('SplitViewComponent', () => {
  let component: SplitViewComponent;
  let fixture: ComponentFixture<SplitViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplitViewComponent],
    });
    fixture = TestBed.createComponent(SplitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
