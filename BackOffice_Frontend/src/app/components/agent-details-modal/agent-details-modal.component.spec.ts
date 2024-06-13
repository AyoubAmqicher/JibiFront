import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsModalComponent } from './agent-details-modal.component';

describe('AgentDetailsModalComponent', () => {
  let component: AgentDetailsModalComponent;
  let fixture: ComponentFixture<AgentDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentDetailsModalComponent]
    });
    fixture = TestBed.createComponent(AgentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
