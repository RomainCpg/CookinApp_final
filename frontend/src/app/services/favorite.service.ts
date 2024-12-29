import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {


  private apiUrl = '/api/favorites';

  constructor(private http: HttpClient) {}

  // Ajouter un favori
  addFavorite(recipeId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { recipeId, userId };
    return this.http.post<any>(`${this.apiUrl}`, body, { headers });
  }

  // Obtenir tous les favoris d'un utilisateur
  getFavoritesByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/users/${userId}/favorites`);
  }

  // Supprimer un favori par ID
  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
