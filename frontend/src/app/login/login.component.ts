import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  pseudo: string = '';

  constructor(private authService: AuthService, private router: Router) {}


  //Méthode pour se connecter en faisant appel au service des accounts
  login(): void {
    this.authService.login(this.pseudo).subscribe(
      (response) => {
        this.authService.saveUserId(response.id);
        console.log('Utilisateur connecté avec ID :', response.id);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Erreur lors de la connexion :', error);
      }
    );
  }

  navigateToAccountCreation() {
    this.router.navigate(['/account-creation']);
  }
}
