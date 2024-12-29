import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import {RecipeService} from '../services/recipe.service';
import {IngredientRecipeService} from '../services/ingredient-recipe.service';
import {NgIf} from '@angular/common';
import {HighchartsChartModule} from 'highcharts-angular';
import {IngredientsService} from '../services/ingredients.service';

@Component({
  selector: 'app-recipe-stats',
  templateUrl: './recipe-stats.component.html',
  standalone: true,
  imports: [
    NgIf,
    HighchartsChartModule
  ],
  styleUrls: ['./recipe-stats.component.css']
})
export class RecipeStatsComponent implements OnInit {
  totalRecipes: number = 0;
  mostUsedIngredientsLabels: string[] = [];
  mostUsedIngredientsData: number[] = [];

  recipes: any[] = [];

  Highcharts = Highcharts;
  chartOptions: any = {};

  constructor(private recipeService: RecipeService, private ingredientRecipeService: IngredientRecipeService, private ingredientService: IngredientsService) {}

  ngOnInit(): void {

    this.getAllRecipes();
    this.numberOfUsedForIngredient();
  }

  getAllRecipes(): void{
    this.recipeService.getAllRecipes().subscribe((data) => {
      this.recipes = data;
      this.totalRecipes = data.length;
    })
  }

  // Récupérer les nombre d'utilisation des ingrédients
  numberOfUsedForIngredient(): void {
    this.ingredientRecipeService.getAll().subscribe((data) => {
      // Créer un dictionnaire pour accumuler les quantités par ingredientId
      const ingredientMap = new Map<number, number>();

      // Parcourir les données et accumuler les quantités pour chaque ingrédient
      data.forEach((item) => {
        if (ingredientMap.has(item.ingredientId)) {
          ingredientMap.set(item.ingredientId, ingredientMap.get(item.ingredientId)! + item.quantity);
        } else {
          ingredientMap.set(item.ingredientId, item.quantity);
        }
      });

      // Transformer le dictionnaire en un tableau pour l'utiliser dans le graphique
      const ingredientData = Array.from(ingredientMap, ([id, quantity]) => ({ id, quantity }));

      // Créer un tableau de Promises pour récupérer les noms des ingrédients
      const ingredientPromises = ingredientData.map(item =>
        this.ingredientService.getIngredientByID(item.id).toPromise()
      );

      Promise.all(ingredientPromises).then(ingredients => {
        // Recupérer les noms des ingrédients
        this.mostUsedIngredientsLabels = ingredients.map(ing => ing.name);
        this.mostUsedIngredientsData = ingredientData.map(item => item.quantity);

        //Création du graphique
        this.chartOptions = {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Ingrédients les plus utilisés'
          },
          xAxis: {
            categories: this.mostUsedIngredientsLabels,
            title: {
              text: 'Ingrédients'
            }
          },
          yAxis: {
            title: {
              text: 'Nombre d\'utilisations'
            }
          },
          series: [
            {
              name: 'Ingrédients',
              data: this.mostUsedIngredientsData
            }
          ]
        };
      }).catch((error) => {
        console.error('Erreur lors de la récupération des ingrédients:', error);
      });
    });
  }



}
