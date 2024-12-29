import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngredientRecipeService {

  constructor(private http: HttpClient) { }


  // Ajouter un ingrédient à la liste des ingrédients d'une recette
  addIngredient(recipeId: number, ingredientId: number, quantity: number|null): Observable<any> {

    return this.http.post<any>(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, {quantity} );

  }

  // récupérer tous les ingrédients possible
  getAll() : Observable<any[]>{
    return this.http.get<any[]>('/api/recipes-ingredients');
  }

}
