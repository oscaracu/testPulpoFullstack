import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.css'],
})
export class ToggleBtnComponent {
  @Input() toggleState!: boolean;
  @Input() currentState!: string;
  @Output() stateChange = new EventEmitter<boolean>();

  setState(state: boolean): void {
    this.stateChange.emit(state);
  }
}
