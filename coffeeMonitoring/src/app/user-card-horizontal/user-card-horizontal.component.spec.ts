import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardHorizontalComponent } from './user-card-horizontal.component';

describe('UserCardHorizontalComponent', () => {
  let component: UserCardHorizontalComponent;
  let fixture: ComponentFixture<UserCardHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
