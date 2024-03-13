import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorModalComponent } from './server-error-modal.component';

describe('ServerErrorModalComponent', () => {
  let component: ServerErrorModalComponent;
  let fixture: ComponentFixture<ServerErrorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerErrorModalComponent],
    });
    fixture = TestBed.createComponent(ServerErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
