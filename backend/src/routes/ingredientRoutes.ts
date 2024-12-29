import express from 'express';
import {
    createIngredient,
    getAllIngredients,
    updateIngredient,
    deleteIngredient,
    getIngredientById
} from '../controllers/ingredientController';

const router = express.Router();

router.post('/ingredients', createIngredient);
router.get('/ingredients', getAllIngredients);
router.get('/ingredients/:id', getIngredientById);
router.put('/ingredients/:id', updateIngredient);
router.delete('/ingredients/:id', deleteIngredient);

export default router;
