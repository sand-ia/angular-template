import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCComponent } from './feature-c.component';

describe('FeatureCComponent', () => {
  let component: FeatureCComponent;
  let fixture: ComponentFixture<FeatureCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureCComponent]
    });
    fixture = TestBed.createComponent(FeatureCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
