import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {RecipeService} from '../services/recipe.service';
import {FavoriteService} from '../services/favorite.service';
import {AuthService} from '../services/auth.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    NavbarComponent,
    NgForOf,
    NgIf,
    RouterOutlet,
    SlicePipe,
    RouterLink,
    NgClass
  ],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {

  recipes: any[] = [];  // Liste complète des recettes
  filteredRecipes: any[] = [];  // Liste filtrée des recettes en fonction de la recherche
  favoriteIds: { [key: number]: number } = {}; //dictionnaire pour lié les favoris et les recettes


  constructor(private recipeService: RecipeService, private favoriteService: FavoriteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getRecipes();
    this.getFavorites();
  }

  // Méthode pour récupérer les recettes via le service
  getRecipes(): void {
    this.favoriteService.getFavoritesByUser(this.authService.getUserId() ?? 1).subscribe({
      next: (favorites) => {

        const recipeIds = favorites.map(fav => fav.recipeId);

        const recipeRequests = recipeIds.map(id => this.recipeService.getRecipeById(id));

        forkJoin(recipeRequests).subscribe({
          next: (recipes) => {
            this.recipes = recipes;
            this.filteredRecipes = recipes; // Par défaut, afficher toutes les recettes
          },
          error: (err) => console.error('Erreur lors du chargement des recettes :', err)
        });
      },
      error: (err) => console.error('Erreur lors du chargement des favoris :', err)
    });
  }


  // Méthode de recherche
  searchRecipes(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredRecipes = this.recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  }

  // Récupérer les favoris
  getFavorites(): void {
    const userId = this.authService.getUserId() ?? 0;
    this.favoriteService.getFavoritesByUser(userId).subscribe((favorites) => {
      this.favoriteIds = {};
      favorites.forEach((fav) => {
        this.favoriteIds[fav.recipeId] = fav.id; // id comme clé, recipeId comme valeur
      });
      console.log(this.favoriteIds);
    });
  }



  isFavorite(recipeId: number): boolean {
    console.log(`recipe ${recipeId} : ${this.favoriteIds.hasOwnProperty(recipeId)};`)
    return this.favoriteIds.hasOwnProperty(recipeId);
  }



  toggleFavorite(recipe: any): void {
    const userId = this.authService.getUserId() ?? 0;
    const favoriteId = this.favoriteIds[recipe.id];

    console.log('User ID:', userId);  // Débogage: Affiche l'ID de l'utilisateur
    console.log('Recipe ID:', recipe.id);  // Débogage: Affiche l'ID de la recette
    console.log('Favorite ID:', favoriteId);  // Débogage: Affiche l'ID du favori (s'il existe)

    if (favoriteId) {
      // Si la recette est déjà dans les favoris, la retirer
      console.log('Recipe is already in favorites. Removing favorite...');
      this.favoriteService.removeFavorite(favoriteId).subscribe(() => {
        console.log('Favorite removed successfully');
        this.getFavorites(); // Récupérer les favoris après suppression
      }, (error) => {
        console.error('Error removing favorite:', error);  // Débogage: Affiche une erreur si la suppression échoue
      });
    } else {
      // Si la recette n'est pas encore dans les favoris, l'ajouter
      console.log('Recipe is not in favorites. Adding favorite...');
      this.favoriteService.addFavorite(recipe.id, userId).subscribe((favorite) => {
        console.log('Favorite added successfully:', favorite);  // Débogage: Affiche le favori ajouté
        this.getFavorites(); // Récupérer les favoris après ajout
      }, (error) => {
        console.error('Error adding favorite:', error);  // Débogage: Affiche une erreur si l'ajout échoue
      });
    }

  }



}
