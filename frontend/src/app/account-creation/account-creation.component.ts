import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './account-creation.component.html'
})
export class AccountCreationComponent {


  account = {
    firstName: '',
    lastName: '',
    pseudo: '',
    dateOfCreation: '', // Sera défini automatiquement
  };

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.account.dateOfCreation = new Date().toISOString().split('T')[0]; // crééé au format YYYY-MM-DD
  }

  onSubmit(): void {
    this.accountService.createAccount(this.account).subscribe({
      next: () => {
        alert('Compte créé avec succès !');
        this.router.navigate([""])
      },
      error: (err) => {
        console.error('Erreur lors de la création du compte :', err);
        alert('Une erreur est survenue.');
      },
    });
  }
}
