import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardVerticalComponent } from './user-card-vertical.component';

describe('UserCardVerticalComponent', () => {
  let component: UserCardVerticalComponent;
  let fixture: ComponentFixture<UserCardVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardVerticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
