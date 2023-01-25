import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoveltiesCategories } from '../models/novelties-categories';

@Component({
  selector: 'app-novelties-categories-select',
  templateUrl: './novelties-categories-select.component.html',
  styleUrls: ['./novelties-categories-select.component.css'],
})
export class NoveltiesCategoriesSelectComponent {
  @Input() options!: NoveltiesCategories[];
  @Output() selected = new EventEmitter<string>();

  currentSelection!: string;
  isOpen: boolean = false;

  setOption(option: string): void {
    this.selected.emit(option);
    this.isOpen = !this.isOpen;
  }
}
