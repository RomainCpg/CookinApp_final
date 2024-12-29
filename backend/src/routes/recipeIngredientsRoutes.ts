import express from 'express';
import {
    addIngredientToRecipe,
    createRecipeIngredient, getAllIngredientsUsed,
    getAllRecipeIngredients
} from '../controllers/recipeIngredientController';

const router = express.Router();

router.post('/recipes/:id/ingredients', createRecipeIngredient);
router.post('/recipes/:recipeId/ingredients/:ingredientId', addIngredientToRecipe);
router.get('/recipes/:recipeId/ingredients', getAllRecipeIngredients);
router.get('/recipes-ingredients', getAllIngredientsUsed)

export default router;
