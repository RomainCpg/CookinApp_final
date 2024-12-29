import { Component } from '@angular/core';
import {AccountService} from '../services/account.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-account-modification',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './account-modification.component.html',
  styleUrl: './account-modification.component.css'
})
export class AccountModificationComponent {

  account = {
    firstName: '',
    lastName: '',
  };

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const accountId = this.authService.getUserId();

    if (accountId) {
      // Récupérer les données actuelles du compte
      this.accountService.getAccountById(accountId).subscribe({
        next: (data) => {
          this.account.firstName = data.firstName;
          this.account.lastName = data.lastName;
        },
        error: (err) => {
          console.error('Erreur lors de la récupération du compte :', err);
        },
      });
    }
  }

  updateAccount(): void {
    const accountId = this.authService.getUserId();

    if (accountId) {
      this.accountService.updateAccount(accountId, this.account).subscribe({
        next: () => {
          console.log('Compte mis à jour avec succès.');
          this.router.navigate(['/']); // Redirection après la mise à jour vers la page principal de l'app
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du compte :', err);
        },
      });
    }
  }

}
