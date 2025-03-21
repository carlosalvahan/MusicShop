import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentDetailComponent } from './instrument-detail.component';

describe('InstrumentDetailComponent', () => {
  let component: InstrumentDetailComponent;
  let fixture: ComponentFixture<InstrumentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstrumentDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
