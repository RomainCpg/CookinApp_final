import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth/login';

  constructor(private http: HttpClient) {}



  // Se login via un pseudo
  login(pseudo: string) {
    return this.http.post<{ id: number }>(`${this.apiUrl}`, { pseudo });
  }

  // enregistré l'id de l'utilisateur en local
  saveUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  // récupérer l'id de l'utilisateur connecté
  getUserId(): number |null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  // vérifier si il y a un bien un utilisateur connecté
  isAuthenticated() {
    const userId = localStorage.getItem('userId');
    return !!userId;
  }

  // se déconnecter
  logout(): void {
    localStorage.removeItem('userId');
  }


}
