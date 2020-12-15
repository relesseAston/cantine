import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxDebitComponent } from './dialog-box-debit.component';

describe('DialogBoxDebitComponent', () => {
  let component: DialogBoxDebitComponent;
  let fixture: ComponentFixture<DialogBoxDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
