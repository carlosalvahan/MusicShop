import { ChangeDetectionStrategy, Component, forwardRef, input, output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';

@Component({
  selector: 'app-counter-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter-input.component.html',
  styleUrl: './counter-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterInputComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterInputComponent implements ControlValueAccessor {

  maxValue = input<number>(5);
  usingStore = input<boolean>(false);
  storeUpdate = output<number>();

  counterValue = 1;
  disableInput: boolean = false;

  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };

  increment() {
    if (this.counterValue < this.maxValue()) {
      this.counterValue++;
      if (this.usingStore()) {
        this.storeUpdate.emit(this.counterValue);
      } else {
        this.onChange(this.counterValue);
      }
    }
  }

  decrement() {
    if (this.counterValue > 1) {
      this.counterValue--;
      if (this.usingStore()) {
        this.storeUpdate.emit(this.counterValue);
      } else {
        this.onChange(this.counterValue);
      }
    }
  }

  writeValue(value: number): void {
    this.counterValue = value;
    this.onChange(this.counterValue);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disableInput = isDisabled;
  }

}
