import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstrumentComponent } from './create-instrument.component';

describe('CreateInstrumentComponent', () => {
  let component: CreateInstrumentComponent;
  let fixture: ComponentFixture<CreateInstrumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstrumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInstrumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
