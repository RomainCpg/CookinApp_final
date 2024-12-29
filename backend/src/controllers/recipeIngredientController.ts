import { Request, Response } from 'express';
import RecipeIngredient from '../models/RecipeIngredient';

// Créer un nouveau RecipeIngredient (associer un ingrédient à une recette)
export const createRecipeIngredient = async (req: Request, res: Response): Promise<void> => {
    const { quantity, ingredientId } = req.body;
    const recipeId = req.params.recipeId;  // On récupère l'ID de la recette dans l'URL

    try {
        const newRecipeIngredient = await RecipeIngredient.create({
            quantity,
            ingredientId,
            recipeId
        });

        res.status(201).json(newRecipeIngredient);
    } catch (error) {
        console.error("Error creating RecipeIngredient:", error);
        res.status(500).json({ message: "Error creating RecipeIngredient" });
    }
};

// Ajouter un ingrédient à une recette
export const addIngredientToRecipe = async (req: Request, res: Response): Promise<void> => {
    const recipeId = req.params.recipeId;  // ID de la recette
    const ingredientId = req.params.ingredientId;  // ID de l'ingrédient

    try {
        // Créer une nouvelle entrée dans RecipeIngredient pour l'association
        const recipeIngredient = await RecipeIngredient.create({
            recipeId,       // ID de la recette
            ingredientId,   // ID de l'ingrédient
            quantity: req.body.quantity || 1,  // Quantité de l'ingrédient (par défaut 1 si non spécifié)
        });

        res.status(201).json({
            message: "Ingredient added to recipe successfully",
            recipeIngredient
        });
    } catch (error) {
        console.error("Error adding ingredient to recipe:", error);
        res.status(500).json({ message: "Error adding ingredient to recipe" });
    }
};

// Obtenir tous les RecipeIngredients
export const getAllRecipeIngredients = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipeId = req.params.recipeId;

        if (isNaN(Number(recipeId))) {
            res.status(400).json({ message: "Invalid Recipe ID" });
        }

        const recipeIngredients = await RecipeIngredient.findAll({ where: { recipeId } });

        if (recipeIngredients.length === 0) {
            res.status(404).json({ message: `No ingredients found for Recipe ID ${recipeId}` });
        }

        res.status(200).json(recipeIngredients);
    } catch (error) {
        console.error("Error fetching RecipeIngredients:", error); // Log complet de l'erreur
        res.status(500).json({
            message: "Error fetching RecipeIngredients",
            error: error instanceof Error ? error.message : error
        });
    }
};

export const getAllIngredientsUsed = async (req: Request, res: Response): Promise<void> => {
    try {


        const recipeIngredients = await RecipeIngredient.findAll();

        res.status(200).json(recipeIngredients);
    } catch (error) {
        console.error("Error fetching RecipeIngredients:", error);
        res.status(500).json({
            message: "Error fetching RecipeIngredients",
            error: error instanceof Error ? error.message : error
        });
    }
}

