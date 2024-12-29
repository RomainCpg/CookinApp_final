import { Routes } from '@angular/router';
import {MyAccountComponent} from './my-account/my-account.component';
import {LoginComponent} from './login/login.component';
import {StartComponent} from './start/start.component';
import {RecipeComponent} from './recipe/recipe.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from '../auth.guard';
import {CreateRecipeComponent} from './create-recipe/create-recipe.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {RecipeStatsComponent} from './recipe-stats/recipe-stats.component';
import {AccountCreationComponent} from './account-creation/account-creation.component';
import {AccountModificationComponent} from './account-modification/account-modification.component';

export const routes: Routes = [
  {path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'start', component: StartComponent, canActivate: [AuthGuard]},
  {path: 'recipe/create', component: CreateRecipeComponent, canActivate: [AuthGuard]},
  {path: 'recipe/:id', component: RecipeComponent, canActivate: [AuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
  {path: 'stats', component: RecipeStatsComponent, canActivate: [AuthGuard]},
  {path: 'account-creation', component: AccountCreationComponent},
  {path: 'account-modification', component: AccountModificationComponent, canActivate: [AuthGuard]},

];
