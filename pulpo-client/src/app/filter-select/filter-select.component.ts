import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-select',
  templateUrl: './filter-select.component.html',
  styleUrls: ['./filter-select.component.css'],
})
export class FilterSelectComponent {
  @Input() options!: string[];
  @Input() listName!: string;
  @Output() selected = new EventEmitter<string>();

  currentSelection!: string;
  isOpen: boolean = false;

  setOption(option: string): void {
    this.selected.emit(option);
    this.isOpen = !this.isOpen;
  }
}
