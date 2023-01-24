import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.css'],
})
export class SortButtonComponent {
  @Input() title!: string;
  @Input() toggle!: boolean | null | undefined;
  @Output() event = new EventEmitter();

  onClick(): void {
    let sort = '';
    if (this.toggle === null) this.toggle = false;
    this.toggle = !this.toggle;
    this.toggle ? (sort = 'asc') : (sort = 'desc');
    this.event.emit(sort);
  }
}
