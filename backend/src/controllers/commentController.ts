// src/controllers/CommentController.ts
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Recipe from '../models/Recipe';
import Account from '../models/Account';

// Créer un commentaire
export const addComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { content, rating, recipeId, authorId } = req.body;

        // Validation des champs obligatoires
        if (!content || !rating || !recipeId || !authorId) {
            res.status(400).json({ message: 'All fields (content, rating, recipeId, authorId) are required' });
            return;
        }

        // Création du commentaire
        const comment = await Comment.create({
            content,
            datePosted: new Date(),
            rating,
            recipeId,
            authorId,
        });

        await Recipe.updateAverageRating(recipeId);

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: (error as Error).message });
    }
};

// Obtenir tous les commentaires pour une recette
export const getCommentsByRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const { recipeId } = req.params;

        if (!recipeId) {
            res.status(400).json({ message: 'recipeId is required' });
            return;
        }

        const comments = await Comment.findAll({
            where: { recipeId }

        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: (error as Error).message });
    }
};

// Obtenir un commentaire par ID
export const getCommentById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            include: [
                { model: Recipe, as: 'recipe', attributes: ['id', 'name'] },
                { model: Account, as: 'author', attributes: ['id', 'name'] },
            ],
        });

        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error: (error as Error).message });
    }
};

// Supprimer un commentaire par ID
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }

        await comment.destroy();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error: (error as Error).message });
    }
};
