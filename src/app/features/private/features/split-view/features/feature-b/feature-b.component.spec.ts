import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBComponent } from './feature-b.component';

describe('FeatureBComponent', () => {
  let component: FeatureBComponent;
  let fixture: ComponentFixture<FeatureBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureBComponent]
    });
    fixture = TestBed.createComponent(FeatureBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
