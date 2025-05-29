import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuperheroeComponent } from './view-superheroe.component';

describe('ViewSuperheroeComponent', () => {
  let component: ViewSuperheroeComponent;
  let fixture: ComponentFixture<ViewSuperheroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSuperheroeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSuperheroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
