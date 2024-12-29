// src/controllers/FavoriteController.ts
import { Request, Response } from 'express';
import Favorite from '../models/Favorite';
import Recipe from '../models/Recipe';
import Account from '../models/Account';

// Créer un favori
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { recipeId, userId } = req.body;

        // Vérification des champs obligatoires
        if (!recipeId || !userId) {
            res.status(400).json({ message: 'recipeId and userId are required' });
            return;
        }

        const existingFavorite = await Favorite.findOne({ where: { recipeId, userId } });
        if (existingFavorite) {
            res.status(409).json({ message: 'This recipe is already in favorites' });
            return;
        }

        const favorite = await Favorite.create({ recipeId, userId, dateAdded: new Date() });
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Error creating favorite', error: (error as Error).message });
    }
};

// Obtenir tous les favoris d'un utilisateur
export const getFavoritesByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        // Vérification du paramètre userId
        if (!userId) {
            res.status(400).json({ message: 'userId is required' });
            return;
        }

        const favorites = await Favorite.findAll({
            where: { userId }
        });

        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites', error: (error as Error).message });
    }
};

// Supprimer un favori (par ID)
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Vérification de l'existence du favori
        const favorite = await Favorite.findByPk(id);
        if (!favorite) {
            res.status(404).json({ message: 'Favorite not found' });
            return;
        }

        await favorite.destroy();
        res.status(200).json({ message: 'Favorite deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting favorite', error: (error as Error).message });
    }
};


