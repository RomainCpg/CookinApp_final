import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountModificationComponent } from './account-modification.component';

describe('AccountModificationComponent', () => {
  let component: AccountModificationComponent;
  let fixture: ComponentFixture<AccountModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountModificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
