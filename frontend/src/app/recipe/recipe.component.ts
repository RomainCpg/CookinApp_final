import { Component } from '@angular/core';
import {RecipeService} from '../services/recipe.service';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {IngredientsService} from '../services/ingredients.service';
import {CommentService} from '../services/comment.service';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    NgForOf, RouterModule, NgIf, FormsModule, DatePipe, NavbarComponent
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  recipe: any;
  ingredients: { [key: string]: number } = {};
  comments: any[] = [];

  newComment = {
    content: '',
    rating: 1,
    recipeId: 1, // Rempli plus tard avec l'ID de la recette
    authorId: 1 // Remplacé après avec l'ID de l'utilisateur connecté
  };

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private ingredientsService: IngredientsService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'ID de la recette à partir de l'URL
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRecipe(recipeId);
    this.loadIngredients(recipeId)
    this.loadComments(recipeId)

    this.newComment.authorId = this.authService.getUserId() ?? 0;
    this.newComment.recipeId = recipeId;

  }

  loadRecipe(id: number): void {
    this.recipeService.getRecipeById(id).subscribe((data) => {
      this.recipe = data;

    });
  }

  loadIngredients(id: number): void {
    this.recipeService.getIngredientsByRecipeId(id).subscribe((data) => {

      data.forEach(ingredient => {

        this.ingredientsService.getIngredientByID(ingredient.ingredientId).subscribe((ingredientData) => {

          if (ingredientData) {
            // Ajoute au dictionnaire le nom de l'ingrédient comme clé et la quantité comme valeur
            const ingredientName = ingredientData.name;
            const ingredientQuantity = ingredient.quantity;
            this.ingredients[ingredientName] = ingredientQuantity;

          } else {
            console.error('No ingredient data found for ID:', ingredient.id);
          }
        });



      });
    });
  }



  getIngredientEntries() {
    return Object.entries(this.ingredients).map(([key, value]) => ({
      key,      //soit le nom
      value     // et ici la quantité
    }));
  }

  // Charger les commentaires
  loadComments(recipeId: number): void {
    this.commentService.getCommentsByRecipe(recipeId).subscribe((comments) => {
      this.comments = comments;
      console.log("Commentaire  : ", comments)
    });
  }

  submitComment(): void {
    this.commentService.addComment(this.newComment).subscribe((comment) => {
      this.comments.push(comment); // Ajouter le commentaire à la liste
      this.newComment.content = ''; // Réinitialiser le formulaire
      this.newComment.rating = 1;
      this.router.navigate([this.router.url]).then(() => {
        window.location.reload();
      });
    });
  }
}
