import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxCreditComponent } from './dialog-box-credit.component';

describe('DialogBoxCreditComponent', () => {
  let component: DialogBoxCreditComponent;
  let fixture: ComponentFixture<DialogBoxCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
