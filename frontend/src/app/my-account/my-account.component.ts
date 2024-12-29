import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../services/account.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../services/auth.service';
import {NavbarComponent} from '../navbar/navbar.component';


@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    DatePipe,
    NavbarComponent
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent {

  account: any; // Les données du compte

  constructor(
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAccount();
  }

  //Récupéré le compte connecté
  getAccount(): void {
    const id = this.authService.getUserId() ?? 0;

    this.accountService.getAccountById(id).subscribe(
      (data) => {
        this.account = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du compte :', error);
        this.account = null;
      }
    );
  }




  editAccount(): void {
    this.router.navigate(['/account-modification'])
  }

  deleteAccount(): void {
    const accountID = this.authService.getUserId() ?? 0;

    // Afficher une pop-up de confirmation
    const userConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ?');

    if (userConfirmed) {
      this.authService.logout();
      this.accountService.deleteAccount(accountID).subscribe({
        next: () => {
          console.log('Compte supprimé avec succès :', accountID);
          this.router.navigate(['']); // retourné à une page de connexion
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du compte :', err);
        },
      });
    } else {
      console.log('Suppression du compte annulée.');
    }
  }



  logout() {
    this.authService.logout()
    this.router.navigate([''])
  }
}
