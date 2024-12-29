import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {RecipeService} from '../services/recipe.service';
import {FavoriteService} from '../services/favorite.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  recipes: any[] = [];  // Liste complète des recettes
  filteredRecipes: any[] = [];  // Liste filtrée des recettes en fonction de la recherche
  favoriteIds: { [key: number]: number } = {}; // Dictionnaire pour lié favoris et recettes


  constructor(private recipeService: RecipeService, private favoriteService: FavoriteService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getRecipes();
    this.getFavorites();


  }

  // Méthode pour récupérer les recettes via le service
  getRecipes(): void {
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipes = data;
      this.filteredRecipes = data;  // Par défaut afficher toutes les recettes
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

    if (favoriteId) {
      // Si la recette est déjà dans les favoris, la retirer
      console.log('Recipe is already in favorites. Removing favorite...');
      this.favoriteService.removeFavorite(favoriteId).subscribe(() => {
        console.log('Favorite removed successfully');
        this.getFavorites(); // MAJ des favoris
      }, (error) => {
        console.error('Error removing favorite:', error);
      });
    } else {
      // Si la recette n'est pas encore dans les favoris, l'ajouter
      this.favoriteService.addFavorite(recipe.id, userId).subscribe((favorite) => {
        console.log('Favorite added successfully:', favorite);
        this.getFavorites(); // MAJ des favoris après ajout
      }, (error) => {
        console.error('Error adding favorite:', error);
      });
    }

  }



}
