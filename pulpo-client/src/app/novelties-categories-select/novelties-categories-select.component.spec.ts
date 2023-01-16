import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltiesCategoriesSelectComponent } from './novelties-categories-select.component';

describe('NoveltiesCategoriesSelectComponent', () => {
  let component: NoveltiesCategoriesSelectComponent;
  let fixture: ComponentFixture<NoveltiesCategoriesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoveltiesCategoriesSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoveltiesCategoriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
