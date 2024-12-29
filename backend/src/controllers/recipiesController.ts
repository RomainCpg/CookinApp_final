import { Request, Response } from 'express';
import Recipe from '../models/Recipe';

export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    const { name, description, timeToPrepareInMinute, averageRating } = req.body;

    if (!name || !timeToPrepareInMinute) {
        res.status(400).json({ message: 'Name and timeToPrepareInMinute are required' });
        return;
    }

    try {
        const recipe = await Recipe.create({ name, description, timeToPrepareInMinute, averageRating });
        res.status(201).json(recipe);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creating recipe', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Obtenir toutes les recettes
export const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await Recipe.findAll();
        if (recipes.length === 0) {
            res.status(404).json({ message: 'No recipes found' });
            return;
        }
        res.status(200).json(recipes);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching recipes', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Obtenir une recette par ID
export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching recipe', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Mettre à jour une recette
export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, timeToPrepareInMinute, averageRating } = req.body;

    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        await recipe.update({ name, description, timeToPrepareInMinute, averageRating });
        res.status(200).json(recipe);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating recipe', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Supprimer une recette
export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const recipe = await Recipe.findByPk(id);
        if (!recipe) {
            res.status(404).json({ message: 'Recipe not found' });
            return;
        }

        await recipe.destroy();
        res.status(204).json({ message: 'Recipe deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting recipe', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
