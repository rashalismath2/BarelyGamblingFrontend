import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingsComponent } from './biddings.component';

describe('BiddingsComponent', () => {
  let component: BiddingsComponent;
  let fixture: ComponentFixture<BiddingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
