// src/controllers/IngredientController.ts
import { Request, Response } from 'express';
import Ingredient from '../models/Ingredient';

// Créer un ingrédient
export const createIngredient = async (req: Request, res: Response): Promise<void> => {
    const { name, description } = req.body;

    if (!name) {
        res.status(400).json({ message: 'Name is required' });
        return;
    }

    try {
        const ingredient = await Ingredient.create({ name, description });
        res.status(201).json(ingredient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error creating ingredient', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Obtenir tous les ingrédients
export const getAllIngredients = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredients = await Ingredient.findAll();
        if (ingredients.length === 0) {
            res.status(404).json({ message: 'No ingredients found' });
            return;
        }
        res.status(200).json(ingredients);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching ingredients', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Obtenir un ingrédient par ID
export const getIngredientById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.status(200).json(ingredient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error fetching ingredient', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Mettre à jour un ingrédient
export const updateIngredient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }

        await ingredient.update({ name, description });
        res.status(200).json(ingredient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating ingredient', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Supprimer un ingrédient
export const deleteIngredient = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const ingredient = await Ingredient.findByPk(id);
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }

        await ingredient.destroy();
        res.status(204).json({ message: 'Ingredient deleted successfully' });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error deleting ingredient', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
