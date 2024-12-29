import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStatsComponent } from './recipe-stats.component';

describe('RecipeStatsComponent', () => {
  let component: RecipeStatsComponent;
  let fixture: ComponentFixture<RecipeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
