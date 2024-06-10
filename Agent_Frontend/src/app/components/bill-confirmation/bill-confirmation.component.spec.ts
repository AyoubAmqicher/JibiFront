import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillConfirmationComponent } from './bill-confirmation.component';

describe('BillConfirmationComponent', () => {
  let component: BillConfirmationComponent;
  let fixture: ComponentFixture<BillConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillConfirmationComponent]
    });
    fixture = TestBed.createComponent(BillConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
