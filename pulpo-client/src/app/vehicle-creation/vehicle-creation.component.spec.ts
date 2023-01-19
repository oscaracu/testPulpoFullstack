import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreationComponent } from './vehicle-creation.component';

describe('VehicleCreationComponent', () => {
  let component: VehicleCreationComponent;
  let fixture: ComponentFixture<VehicleCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
