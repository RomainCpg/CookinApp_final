import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  private apiUrl = '/api/ingredients';

  constructor(private http: HttpClient) {}

  // Récupérer tous les ingrédients
  getAllIngredients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un ingrédient par ID
  getIngredientByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel ingrédient
  createIngredient(ingredient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ingredient);
  }

  // Mettre à jour un ingrédient
  updateIngredient(id: number, ingredient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ingredient);
  }

  // Supprimer un ingrédient
  deleteIngredient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
