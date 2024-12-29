import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import {IngredientsService} from '../services/ingredients.service';
import {RecipeService} from '../services/recipe.service';
import {IngredientRecipeService} from '../services/ingredient-recipe.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NavbarComponent
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {

  constructor(private ingredientsService: IngredientsService, private recipeService: RecipeService, private ingredientRecipeService: IngredientRecipeService) {
  }

  recipe = {
    name: '',
    description: '',
    prepTime: null
  };

  ingredients: { id: number, name: string, selected?: boolean }[] = [];

  // Liste des ingrédients sélectionnés avec leurs quantités
  selectedIngredients: { selected: boolean, quantity: number | null }[] = [];

  ngOnInit(): void{
    this.getAllIngredients();
  }

  getAllIngredients(): void{
    this.ingredientsService.getAllIngredients().subscribe({
      next: (data) => {
        this.ingredients = data.map(ingredient => ({ ...ingredient, selected: false }));
        // Initialiser `selectedIngredients` pour correspondre aux ingrédients récupérés
        this.selectedIngredients = this.ingredients.map((ingredient) => ({
          id: ingredient.id,
          selected: false,
          quantity: null
        }));

        console.log('Ingrédients récupérés:', this.ingredients);
        console.log('Ingrédients récupérés:', this.selectedIngredients);

      },
      error: (err) => console.error('Erreur lors du chargement des ingrédients :', err)
    });
  }

  onSubmit(): void {
    // Filtrer les ingrédients sélectionnés et obtenir leurs ID et quantités
    const ingredientsForRecipe = this.selectedIngredients
      .filter(ingredient => ingredient.selected)  //filtrer les ingrédients sélectionnés
      .map((ingredient, index) => ({
        id: this.ingredients[index].id,  // Ajouter l'ID de l'ingrédient
        name: this.ingredients[index].name,  // Nom
        quantity: ingredient.quantity     // Quantité de l'ingrédient sélectionné
      }));

    const newRecipe = {
      name: this.recipe.name,
      description: this.recipe.description,
      timeToPrepareInMinute: this.recipe.prepTime,
      averageRating: 0
    };

// Envoi de la requête au backend
    this.recipeService.createRecipe(newRecipe).subscribe({
      next: (response) => {
        console.log('Recette créée avec succès :', response);

        const recipeId = response.id;

        for (const ingredient of ingredientsForRecipe) {
          const ingredientId = ingredient.id;
          const quantity = ingredient.quantity;

          // Appel du service pour ajouter l'ingrédient à la recette
          this.ingredientRecipeService.addIngredient(recipeId, ingredientId, quantity).subscribe({
            next: (response) => {
              console.log('Ingrédient ajouté avec succès:', response);
            },
            error: (err) => {
              console.error('Erreur lors de l\'ajout de l\'ingrédient:', err);
            }
          });
        }

      },
      error: (err) => {
        console.error('Erreur lors de la création de la recette :', err);
      }
    });

  }

}
