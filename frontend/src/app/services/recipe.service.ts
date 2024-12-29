import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = '/api/recipes';
  constructor(private http: HttpClient) {}

  // Récupérer toutes les recettes
  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer une recette par ID
  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer une nouvelle recette
  createRecipe(recipe: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, recipe);

  }

  // Mettre à jour une recette existante
  updateRecipe(id: number, updatedRecipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedRecipe);
  }

  // Supprimer une recette par ID
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les ingrédients de la recette par ID
  getIngredientsByRecipeId(recipeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${recipeId}/ingredients`);
  }


}
