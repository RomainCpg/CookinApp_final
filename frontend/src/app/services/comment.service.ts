import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'api/comments';

  constructor(private http: HttpClient) {}


  // récupérer les commentaires d'une recette
  getCommentsByRecipe(recipeId: number): Observable<any[]> {
    return this.http.get<any[]>(`api/recipes/${recipeId}/comments`);
  }

  // ajouter un commentaire à une recette
  addComment(comment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }
}
