import express from 'express';
import {
    addComment,
    getCommentsByRecipe,
    getCommentById,
    deleteComment,
} from '../controllers/commentController';

const router = express.Router();

router.post('/comments', addComment);
router.get('/recipes/:recipeId/comments', getCommentsByRecipe);
router.get('/comments/:id', getCommentById);
router.delete('/comments/:id', deleteComment);

export default router;
