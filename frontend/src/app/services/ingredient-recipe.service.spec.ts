import { TestBed } from '@angular/core/testing';

import { IngredientRecipeService } from './ingredient-recipe.service';

describe('IngredientRecipeService', () => {
  let service: IngredientRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
