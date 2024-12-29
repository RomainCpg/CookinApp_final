import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = "/api/accounts"

  constructor(private http: HttpClient) { }

  //obtenir un compte par son id
  getAccountById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Supprimer un compte à partir de son Id
  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //Modifier un compte à partir de son Id
  updateAccount(id: number, accountData: { firstName: string; lastName: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, accountData);
  }

  //Créer un compte (nom, prenom, pseudo et date de création)
  createAccount(accountData: { firstName: string; lastName: string; pseudo: string; dateOfCreation: string }): Observable<any> {
    return this.http.post(this.apiUrl, accountData);
  }




}
